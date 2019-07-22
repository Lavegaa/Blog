import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import PostInfo from 'components/post/PostInfo';

const PostPage = () => {
    return (
        <div>
            <PageTemplate>
                <PostInfo/>
            </PageTemplate>
        </div>
    );
};

export default PostPage;