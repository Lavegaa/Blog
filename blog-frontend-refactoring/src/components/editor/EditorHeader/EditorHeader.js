import React from 'react';
import oc from 'open-color';
import Button from '@components/common/Button';

const Header = styled.div`
    background: ${oc.blue[6]};
    height: 4rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    align-items: center;
`;

const Submit = styled.div`
    margin-left: auto;
`;

import styled from 'styled-components';

const EditorHeader = ({  }) => {
    return (
        <Header>
            {/* <div>
                <Button onClick={onGoBack} theme="outline">뒤로가기</Button>
            </div>
            <Submit>
                <Button onClick={onSubmit} theme="outline">{isEdit ? '수정' : '작성'}하기</Button>
            </Submit> */}
        </Header>
    );
};

export default EditorHeader;