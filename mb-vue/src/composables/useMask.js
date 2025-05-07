export function maskCpf(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    return digits
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2')
}

export function maskCnpj(value) {
    const digits = value.replace(/\D/g, '').slice(0, 14)
    return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
}

export function maskPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
  
    if (digits.length <= 10) {
      // (XX) XXXX-XXXX
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }
  
    // (XX) 9XXXX-XXXX
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }