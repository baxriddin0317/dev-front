import { useHistory } from 'react-router-dom';

const PathName = () => {
  const history = useHistory();

  const asPath = history.location.pathname;

  const pathName = asPath.split('/');

  const path = pathName.filter((p) => p !== '').join(' ');

  return [path];
};

export default PathName;
