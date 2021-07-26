import md5 from 'md5';

const gravatar = (email) => {
  const base = 'https://gravatar.com/avatar/';
  // formatear el email para que sea genérico
  const formatedEmail = email.trim().toLowerCase();
  // @ debemos mandar enun formato binario
  const hash = md5(formatedEmail, { encoding: 'binary' });
  return `${base}${hash}`;
};

export default gravatar;
