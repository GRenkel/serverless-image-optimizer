const translations = {
  'en':require('./en/translation.json'),
  pt:require('./pt-br/translation.json')
}
const translator = {}
// can be added the desired multilanguage framework

export function translate(key, options = {}) {
  const [context, message] = key.split('.')
  return translations['en'][context][message]
}
export default translator
