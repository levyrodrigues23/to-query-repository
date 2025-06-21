import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from '../Repositorio/Styles'
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio } = useParams();

  const [repoData, setRepoData] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters] = useState([
    { state: 'open', label: 'Abertas' },
    { state: 'all', label: 'Todas' },
    { state: 'closed', label: 'Fechadas' },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(repositorio);

      try {
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: filters[filterIndex].state,
              page,
              per_page: 5,
            },
          }),
        ]);

        setRepoData(repositorioData.data);
        setIssues(Array.isArray(issuesData.data) ? issuesData.data : []);
      } catch (error) {
        setIssues([]);
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [repositorio, filterIndex, page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
    setPage(1);
  }

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img
          src={repoData.owner?.avatar_url}
          alt={repoData.owner?.login}
        />
        <h1>{repoData.name}</h1>
        <p>{repoData.description}</p>
      </Owner>

      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button
            type="button"
            key={filter.label}
            onClick={() => handleFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </FilterList>

      <IssuesList>
        {Array.isArray(issues) && issues.length > 0 ? (
          issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))
        ) : (
          <li>Nenhuma issue encontrada.</li>
        )}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage('back')}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Proxima
        </button>
      </PageActions>
    </Container>
  );
}