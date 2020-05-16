import React from 'react';
import { Button, Result } from 'antd';
import { RouteComponentProps } from '@reach/router';
import { PathEnum } from '../../../shared/enum/PathEnum';
import { useIntl } from 'react-intl';

export const NotFound: React.FunctionComponent<RouteComponentProps> = () => {
    const intl = useIntl();

    return (
        <Result
            status="404"
            title="404"
            subTitle={intl.formatMessage({ id: 'notFound.message' })}
            extra={
                <Button type="primary" href={PathEnum.STORE}>
                    {intl.formatMessage({ id: 'notFound.back.button' })}
                </Button>
            }
        />
    );
};
