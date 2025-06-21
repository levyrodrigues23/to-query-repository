import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton, Suggestions } from "./Styles";
import { useState, useCallback, useEffect, useRef } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const repoStorage = localStorage.getItem("repositorios");
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repositorios", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null);

        try {
          if (newRepo === "") {
            throw new Error("Você precisa indicar um repositório");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorios.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("O repositório já foi adicionado, tente outro!");
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
          setSuggestions([]);
        } catch (error) {
          setAlert(true);
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
    const value = e.target.value;
    setNewRepo(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.length > 2) {
      setLoadingSuggestions(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const response = await api.get(
            `https://api.github.com/search/repositories?q=${value}`
          );
          setSuggestions(response.data.items.slice(0, 5));
        } catch (error) {
          console.error("Erro ao buscar sugestões:", error);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 500);
    } else {
      setSuggestions([]);
    }
  }

  function handleSuggestionClick(fullName) {
    setNewRepo(fullName);
    setSuggestions([]);
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
      <div>
        <h1>
          <FaGithub size={25} />
          Meus Repositórios
        </h1>
      </div>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>

        {newRepo.length > 2 && (
          <Suggestions>
            {loadingSuggestions && (
              <li>
                <FaSpinner size={16} /> Buscando...
              </li>
            )}
            {!loadingSuggestions &&
              suggestions.map((repo) => (
                <li
                  key={repo.id}
                  onClick={() => handleSuggestionClick(repo.full_name)}
                >
                  <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                  {repo.full_name}
                </li>
              ))}
          </Suggestions>
        )}
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
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
