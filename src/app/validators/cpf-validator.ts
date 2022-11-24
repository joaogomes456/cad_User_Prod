import { Validator, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class CpfValidator implements Validator {
  static cpfLength = 11;

  /**
   * Calcula o dígito verificador do CPF.
   */
  static buildDigit(arr: number[]): number {
    const isCpf = arr.length < CpfValidator.cpfLength;
    const digit =
      arr
        .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
        .reduce((total, current) => total + current) %
      CpfValidator.cpfLength;

    if (digit < 2 && isCpf) {
      return 0;
    }

    return CpfValidator.cpfLength - digit;
  }

  /**
   * Valida um CPF de acordo com seu dígito verificador.
   */
  static validate(campo: AbstractControl): ValidationErrors | null {
    const cpf = campo.value.replace(/\D/g, '');

    // Verifica o tamanho da string.
    if (
      [CpfValidator.cpfLength, CpfValidator.cpfLength].indexOf(
        cpf.length
      ) < 0
    ) {
      return { length: true };
    }

    // Verifica se todos os dígitos são iguais.
    if (/^([0-9])\1*$/.test(cpf)) {
      return { equalDigits: true };
    }

    // A seguir é realizado o cálculo verificador.
    const cpfCnpjArr: number[] = cpf.split('').reverse().slice(2);

    cpfCnpjArr.unshift(CpfValidator.buildDigit(cpfCnpjArr));
    cpfCnpjArr.unshift(CpfValidator.buildDigit(cpfCnpjArr));

    if (cpf !== cpfCnpjArr.reverse().join('')) {
      // Dígito verificador não é válido, resultando em falha.
      return { digit: true };
    }

    return null;
  }


  validate(campo: AbstractControl): ValidationErrors | null {
    return CpfValidator.validate(campo);
  }

}
