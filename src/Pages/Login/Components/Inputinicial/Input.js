import React, { useState } from "react";
import "antd/dist/antd.css";
import { Input, Form, Button } from "antd";
import api from "../../../../api";
import { ButtonContainer, LoginButton } from "./styles.js";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";

//export const CpfContext = createContext([]);

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const NumericInput = (props) => {
  const { value, onChange } = props;

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;

    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  }; // '.' at the end or only '-' in the input box.

  const handleBlur = () => {
    let valueTemp = value;

    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };
  
  const title = value ? (
    <span className="numeric-input-title">
      {value !== "-" ? formatNumber(Number(value)) : "-"}
    </span>
  ) : (
    "Digite seu CPF"
    );
  
  const { handleSubmit, control } = useForm();

  const [visible, setVisible] = useState("none");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState();
  const [loading, setLoading] = useState(false);

  async function PostCpf(e) {
    e.preventDefault();
    setLoading(true);
    const authCpf = await api
      .post("/auth/login", {
        cpf: cpf,
        senha: senha,
      })
      .then((res) => {
        // console.log(res)
        setLoading(false);
        console.log(e);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem('user', JSON.stringify(res.data.nome).substring(1, (res.data.nome).length + 1));
        localStorage.setItem('tipo', JSON.stringify(res.data.tipo));
        localStorage.setItem('id', JSON.stringify(res.data.userId));
        api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        window.location.pathname = "/home";
      })
      .catch((e) => {
        setLoading(false);
        if (e.response.status == 401) {
          setVisible("block");
          console.log("Erroooooo");
          setSenha("");
        } else if (e.response.status == 404) {
          setNotFound(true);
        } else if (e.response.status == 400) {
          setWrongPassword(true);
        }
      });
    //setContext(cpf);
  }

  const [notFound, setNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  let helpMessage;
  let status;
  let wrongPasswordMessage;

  if (notFound) {
    helpMessage = "Usuário não encontrado.";
    status = "error";
  } else if (wrongPassword) {
    wrongPasswordMessage = "Senha incorreta!";
    status = "error";
  }

  function FormatarCpf(value) {
    const CPF = value.split(".")
    const UltimosDigitos = CPF[CPF.length - 1].split("-")
    setCpf(CPF[0]+CPF[1]+UltimosDigitos[0]+UltimosDigitos[1]);
  }

  return (
    <>
      <Form 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          }}>
        <Controller
          name="reactMaskInput"
          control={control}
          render={({ field: { onChange } }) => (
            <InputMask 
              style={{
                width: '220px', 
                height: '32px', 
                padding: '4px 11px'
              }}

              mask="999.999.999-99" 
              placeholder='Digite seu CPF' 
              onChange={(e) => {
                handleChange(e);
                FormatarCpf(e.target.value);
                setNotFound(false);
            }}>
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="tel"
                  className="input"
                  disableUnderline
                />
              )}
            </InputMask>
          )}
        />
        

      {/* <form onSubmit={handleSubmit()}>
        <Controller
          as={InputMask}
          control={control}
          mask="999.999.999-99"
          name="cpf"
          // defaultValue={user.cpf}
        />
      </form> */}

      {/* <Form
        name="basic"
        layout="vertical"
        size="large"
        labelCol={{
          span: 0,
        }}
        wrapperCol={{
          span: 0,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="CPF"
          name="cpf"
          validateStatus={status}
          help={helpMessage}
          rules={[
            {
              required: true,
              message: "O CPF é obrigatório!",
            }, 
            {
              // pattern: /^(?:\d*)$/,
              message: "O CPF deve conter apenas números!",
            },
          ]}
          value={cpf}
          onChange={(e) => {
            handleChange(e);
            setCpf(e.target.value);
            setNotFound(false);
          }}
        >
          <Input maxLength={11} minLength={11} placeholder='Digite seu CPF' style={{width: '235px'}}/>
        </Form.Item> */}

        <Form.Item
          style={{ display: visible }}
          minLength={8}
          //label="Senha"
          validateStatus={status}
          help={wrongPasswordMessage}
          name="senha"
          rules={[
            {
              required: true,
              message: "A senha é obrigatória!",
            },
          ]}
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setWrongPassword(false);
          }}
        >
          <Input.Password placeholder="Digite sua senha" type="password" />
        </Form.Item> 

        <ButtonContainer>
          <LoginButton
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            onClick={PostCpf}
          >
            Entrar
          </LoginButton>
        </ButtonContainer>
      </Form>
      
    </>
  );
};

export const Inputt = () => {
  const [value, setValue] = useState("");

  return (
    <NumericInput
      style={{
        width: 350,
        height: 50,
        borderRadius: 5,
      }}
      value={value}
      onChange={setValue}
    />
  );
};

export default Inputt;
