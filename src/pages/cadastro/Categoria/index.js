import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [categorias, setCategoria] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(e) {
    setValue(e.target.getAttribute('name'), e.target.value);
  }

  useEffect(() => {
    setTimeout(() => {
      const url = 'https://musicflixx.herokuapp.com/categorias';
      fetch(url)
        .then(async (res) => {
          const resposta = await res.json();
          setCategoria([
            ...resposta,
          ]);
        });
    }, 4 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome }
      </h1>

      <form onSubmit={
                function handleSubmit(eventInfo) {
                  eventInfo.preventDefault();
                  console.log('vou mandou uma info no submit');
                  setCategoria([
                    ...categorias,
                    values,
                  ]);
                  setValues({ valoresIniciais });
                }
      }
      >

        <FormField
          as="input"
          label="Nome da Categoria"
          tagType
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          as="textarea"
          label="Descrição"
          type="text"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          as="input"
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        {/* <div>

          <label>
            Nome da Categoria:
            <input
              type="text"
              name="nome"
              value={values.nome}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>

          <label>
            Descrição:
            <textarea
              type="text"
              name="descricao"
              value={values.descricao}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>

        <label>
          Cor:
          <input
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
          />
        </label>
      </div>
        */}

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (

      <div>
        Loading.....
      </div>

      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
