import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./Styles";
import {useState, useCallback, useEffect } from "react";

import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null)
  
// did mount
useEffect(()=>{
  const repoStorage = localStorage.getItem("repositorios");
  if (repoStorage) {
    setRepositorios(JSON.parse(repoStorage)); //se tiver algo no localStorage, ele converte de string para objeto
  }
},[])

//did update
useEffect(()=>{
localStorage.setItem("repositorios", JSON.stringify(repositorios))
}, [repositorios])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true); //ativa o loading
        setAlert(null); //limpa o alert
        try {
          if (newRepo === "") {
            throw new Error("Você precisa indicar um repositório");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorios.find(repo => repo.name === newRepo); 

          if (hasRepo){
            throw new Error("O repositório já foi adicionado, tente outro!");
          }       
           


          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]); //ele pega tudo que ja tem, adiciona o data e coloca no array dentro de repositorios
          setNewRepo(""); //limpa o input apos o submit
        } catch (error) {
          setAlert(true); //ativa o alert
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositorios]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null); //limpa o alert quando o usuário digita algo
  }

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorios.filter((r) => r.name !== repo);
      setRepositorios(find);
    },
    [repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton
          loading={loading ? 1 : 0} //se loading for true, o valor é 1, se for false, o valor é 0
        >
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>0
      </Form>
      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name) }`}> {/* o encode informa que o repo todo é um parametro completo, e não duas partes diferentes  */}
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
