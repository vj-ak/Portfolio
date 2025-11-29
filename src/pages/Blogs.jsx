import React from 'react';
import { Outlet } from 'react-router-dom';
import BlogsHeader from '../components/BlogsHeader';

const Blogs = () => {
    return (
        <>
            <BlogsHeader />
            <Outlet />
        </>
    );
};

export default Blogs;
