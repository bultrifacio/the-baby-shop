import React from 'react';
import { Result } from 'antd';
import { Link, RouteComponentProps } from '@reach/router';
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
                <Link to={PathEnum.STORE}>
                    <span>{intl.formatMessage({ id: 'notFound.back.button' })}</span>
                </Link>
            }
        />
    );
};
