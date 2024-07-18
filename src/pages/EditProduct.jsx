import React, { useEffect } from 'react';
import Layout from './Layout';
import FormEditProducts from '../components/FormEditProducts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUserLogin } from '../features/authSlice';

const EditProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state => state.auth));

  useEffect(() => {
    dispatch(GetUserLogin);
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
        <FormEditProducts />
    </Layout>
  )
}

export default EditProducts