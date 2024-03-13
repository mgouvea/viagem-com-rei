export function firstName(name: string) {
  const firstName = name.split(' ')[0];
  const qtdnome = name.split(' ').length;

  return firstName;
}

export function lastName(name: string) {
  const qtdnome = name.split(' ').length;
  const lastName = name.split(' ')[qtdnome - 1];

  return lastName;
}

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const removeCpfMask = (value: string) => {
  return value.replace(/\D/g, '');
};

export function phoneMask(tel: string) {
  tel = tel.replace(/\D/g, '');
  tel = tel.replace(/^(\d)/, '($1');
  tel = tel.replace(/(.{3})(\d)/, '$1)$2');
  if (tel.length == 9) {
    tel = tel.replace(/(.{1})$/, '-$1');
  } else if (tel.length == 10) {
    tel = tel.replace(/(.{2})$/, '-$1');
  } else if (tel.length == 11) {
    tel = tel.replace(/(.{3})$/, '-$1');
  } else if (tel.length == 12) {
    tel = tel.replace(/(.{4})$/, '-$1');
  } else if (tel.length > 12) {
    tel = tel.replace(/(.{4})$/, '-$1');
  }
  return tel;
}
