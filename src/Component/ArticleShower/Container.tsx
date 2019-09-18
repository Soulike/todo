import React, {PureComponent} from 'react';
import View from './View';
// import {hljs} from '../../Singleton';
// import '../../ModuleConfig/MathJax';

interface Props
{
    HTMLContent: string,
}

interface State
{
    wrapper: any,
    loading: boolean,
}

class ArticleShower extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            wrapper: React.createElement('div'),
            loading: true,
        };
    }


    componentDidMount()
    {
        const {HTMLContent} = this.props;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = HTMLContent;
        /*        wrapper.querySelectorAll('pre code').forEach((block) =>
                {
                    hljs.highlightBlock(block);
                });*/

        /*MathJax.Hub.Queue(['Typeset', MathJax.Hub, wrapper, () =>
        {
            this.setState({wrapper, loading: false});
        }]);*/
        this.setState({loading: false});
    }

    render()
    {
        const {wrapper, loading} = this.state;
        return (
            <View HTMLContent={wrapper.innerHTML} loading={loading} />
        );
    }
}

export default ArticleShower;