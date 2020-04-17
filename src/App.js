import React from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository ${(new Date()).toLocaleTimeString()}`,
      url: 'https://github.com/asaphfernandes',
      techs: ['js', 'reactjs', 'node']
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositoriesFiltered = repositories.filter(w => w.id !== id);
    setRepositories(repositoriesFiltered);
  }

  return (
    <div className='container'>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (<li key={repository.id}>
            <a href={repository.url} target='_blank' rel="noopener noreferrer">
              {repository.title}
            </a>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
            <ul className='techs'>{repository.techs && repository.techs.map(tech => <li key={tech}>{tech}</li>)}</ul>
          </li>);
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
