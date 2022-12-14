import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import api from '../../../../api';
import { Select } from 'antd';
const { Option } = Select;
        
export default function CadastroPessoa() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // select
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setTipo(value);
  };

  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [cpf, setCpf] = useState()
  const [foto, setFoto] = useState()
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState(3)
  
  const config = {
    'Content-Type': 'multipart/form-data',
  }

  function Cadastrar(e) {
    e.preventDefault()
    const Form = new FormData();
    Form.append('nome', nome)
    Form.append('email', email)
    Form.append('cpf', cpf)
    Form.append('foto', foto)
    Form.append('senha', senha)
    Form.append('tipo', tipo)

    api.post('/auth/cadastrar', Form, config) 
      .then(res => {
        console.log('Deu certo')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 style={{textAlign: "center"}}>Cadastros</h1>
        <Form.Item label="Tipo"
          name="Tipo"
          initialValue={3}
          rules={[
            {
              required: true,
              message: 'O tipo é obrigatório!',
            },
          ]}>

          <Select
            onChange={handleChange}
          >
            <Option value={3}>Usuário Comum</Option>
            <Option value={2}>Administrador</Option>
            <Option value={1}>Root</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Nome"
          name="Nome"
          rules={[
            {
              required: true,
              message: 'O nome é obrigatório!',
            },
          ]}
          value={nome}
          onChange={e => setNome(e.target.value)}
        >
          <Input type='text' />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: 'O email é obrigatório!',
            },
          ]}
          value={email}
          onChange={e => setEmail(e.target.value)}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item
          label="Cpf"
          name="Cpf"
          maxLength={11}
          minLength={11}
          rules={[
            {
              required: true,
              message: 'O Cpf é obrigatório!',
            },
          ]}
          value={cpf}
          onChange={e => setCpf(e.target.value)}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label="Foto"
          name="Foto"
          value={foto}
          onChange={e => setFoto(e.target.files[0])}
        >
          <Input type='file' />
        </Form.Item>

        <Form.Item
          minLength={8}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'A senha é obrigatória!',
            },
          ]}
          value={senha}
          onChange={e => setSenha(e.target.value)}
        >
          <Input.Password type='password' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="submit" htmlType="submit" onClick={(e) => Cadastrar(e)}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};