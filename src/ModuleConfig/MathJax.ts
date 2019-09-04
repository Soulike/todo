import 'mathjax';

require('mathjax/config/TeX-AMS_HTML-full');

MathJax.Hub.Config({
    showProcessingMessages: false,
    messageStyle: 'none',
    tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']], //行内公式选择符
        displayMath: [['$$', '$$'], ['\\[', '\\]']], //段内公式选择符
    },
});