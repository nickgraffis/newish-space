const _ = require('lodash')
const defaultOptions = {
  iconStyle: 'font-size: 21px; opacity: 0.4;',
  iconClass: 'mdi mdi-content-copy',
  buttonStyle: 'position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none;',
  buttonClass: '',
}

function renderCode(origRule, options) {
  options = _.merge(defaultOptions, options)
  return (...args) => {
    const [tokens, idx] = args
    const content = tokens[idx].content
    const origRendered = origRule(...args)
    return `
<div style='position: relative'>
	${origRendered}
	<button class='markdown-it-code-copy ${options.buttonClass}' data-clipboard-text='
	${content.replace(/[']/g, '<SINGLE-QUOTE>').replace(/["]/g, '<DOUBLE-QUOTE>').replace(/setup/g, '<VUE-SETUP>')}' 
	style='${options.buttonStyle}' title="Copy">
		<span style='${options.iconStyle}' class='${options.iconClass}'></span>
	</button>
</div>
`
  }
}

module.exports = (md, options) => {
  md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block, options)
  md.renderer.rules.fence = renderCode(md.renderer.rules.fence, options)
}
