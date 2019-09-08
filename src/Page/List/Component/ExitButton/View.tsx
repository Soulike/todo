import React from 'react';
import {Button, Icon} from 'antd';
import {ButtonProps} from 'antd/lib/button/button';

interface Props extends ButtonProps {}

function ExitButtonView(props: Props)
{
    return (
        <Button {...props}>
            <Icon type="logout" />
            退出
        </Button>
    );
}

export default React.memo(ExitButtonView);