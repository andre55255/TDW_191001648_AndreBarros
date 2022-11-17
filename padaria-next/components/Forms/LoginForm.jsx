import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

export default function LoginForm({ setShow }) {
    const schema = yup.object().shape({
        login: yup
            .string()
            .required("Login não informado")
            .min(20, "Login deve ter no máximo 20 caracteres"),
        password: yup
            .string()
            .required("Login não informado")
            .min(20, "Login deve ter no máximo 20 caracteres"),
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                login: "",
                password: "",
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="login">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            type="text"
                            name="login"
                            value={values.login}
                            onChange={handleChange}
                            isValid={touched.login && !errors.login}
                            placeholder="Digite seu login"
                        />
                        {errors ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.login}
                            </Form.Control.Feedback>
                        ) : (
                            <Form.Control.Feedback></Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua senha"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Button
                            className="mt-1"
                            variant="secondary"
                            type="button"
                            onClick={() => setShow(false)}
                        >
                            Voltar
                        </Button>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
}
