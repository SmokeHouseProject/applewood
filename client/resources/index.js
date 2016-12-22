export function configure(config) {
  config.globalResources([
    './attributes/enter-press',
    './value-converters/date',
    './value-converters/number',
    './value-converters/role',
    './value-converters/route',
    './elements/dropdown/dropdown',
    './elements/datepicker/datepicker',
    './elements/language/language'
  ]);
}
