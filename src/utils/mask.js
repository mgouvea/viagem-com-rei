export function firstName(name) {
  const firstName = name.split(' ')[0];
  const qtdnome = name.split(' ').length;

  return firstName;
}

export function lastName(name) {
  const qtdnome = name.split(' ').length;
  const lastName = name.split(' ')[qtdnome - 1];

  return lastName;
}

export const cpfMask = (value) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const validaCpfCnpj = (val) => {
  if (val.length === 14) {
    var cpf = val.trim();

    cpf = cpf.replace(/\./g, '');
    cpf = cpf.replace('-', '');
    cpf = cpf.split('');

    var v1 = 0;
    let v2 = 0;
    let aux = false;

    for (var i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] !== cpf[i]) {
        aux = true;
      }
    }

    if (aux === false) {
      return false;
    }

    for (let i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
      v1 += cpf[i] * p;
    }

    v1 = (v1 * 10) % 11;

    if (v1 === 10) {
      v1 = 0;
    }

    if (v1 !== cpf[9]) {
      return false;
    }

    for (let i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
      v2 += cpf[i] * p;
    }

    v2 = (v2 * 10) % 11;

    if (v2 === 10) {
      v2 = 0;
    }

    if (v2 !== cpf[10]) {
      return false;
    } else {
      return true;
    }
  } else if (val.length === 18) {
    var cnpj = val.trim();

    cnpj = cnpj.replace(/\./g, '');
    cnpj = cnpj.replace('-', '');
    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.split('');

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (var j = 1; cnpj.length > j; j++) {
      if (cnpj[j - 1] !== cnpj[j]) {
        aux = true;
      }
    }

    if (aux === false) {
      return false;
    }

    for (var k = 0, np1 = 5, np2 = 13; cnpj.length - 2 > k; k++, np1--, np2--) {
      if (np1 >= 2) {
        v1 += cnpj[k] * np1;
      } else {
        v1 += cnpj[k] * np2;
      }
    }

    v1 = v1 % 11;

    if (v1 < 2) {
      v1 = 0;
    } else {
      v1 = 11 - v1;
    }

    if (v1 !== cnpj[12]) {
      return false;
    }

    for (var m = 0, p1 = 6, p2 = 14; cnpj.length - 1 > m; m++, p1--, p2--) {
      if (p1 >= 2) {
        v2 += cnpj[m] * p1;
      } else {
        v2 += cnpj[m] * p2;
      }
    }

    v2 = v2 % 11;

    if (v2 < 2) {
      v2 = 0;
    } else {
      v2 = 11 - v2;
    }

    if (v2 !== cnpj[13]) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export function phoneMask(tel) {
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
