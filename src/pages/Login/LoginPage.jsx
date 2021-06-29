/* eslint-disable no-template-curly-in-string */
import React, { useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Card, Row, Col, Form, Input, Button, Typography } from "antd";
import AxiosCaller from "../../utils/AxiosCaller";
import PandaSleepSrc from "../../assets/panda-sleep.svg";
import PandaBambooSrc from "../../assets/panda-bamboo.svg";
import Carousel from '@brainhubeu/react-carousel';

import { MailTwoTone } from '@ant-design/icons';

import classes from "./LoginPage.module.scss";

const LoginPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [carouselPage, setCarouselPage] = useState(0);

  const onLogin = async () => {
    const searchParams = new URLSearchParams(location.search);
    const challenge = searchParams.get("challenge");
    const { data: response } = await AxiosCaller.post("/v1/login", {
      challenge,
      email,
      password,
    });
    if (response?.redirectUri) {
      window.location.href = response?.redirectUri;
    }
  };

  const validateMessages = {
    required: '${name} is required!',
    types: {
      email: '${name} is not a valid email!',
      //number: '${label} is not a valid number!',
    },
  };

  return (
    <Row className={classes.loginPage} justify="center" align="middle">
      <Col className={classes.cardColumn} span={8}>
        <Card className={classes.card} bordered={true}>
          <Carousel draggable={false} value={carouselPage}>
            <Row gutter={[0, 32]}>
              <Col span={24} align={"center"}>
                <img className={classes.logo} src={PandaSleepSrc} alt="Logo" />
                <Typography.Title level={2}>
                  Accedi
                </Typography.Title>
                <Typography.Title level={5}>
                  Utilizza il tuo Account PandAuth
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Form
                  name="basic"
                  onFinish={() => setCarouselPage(1)}
                  //onFinishFailed={onFinishFailed}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, type: 'email' }]}
                  >
                    <Input
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                      size={"large"}
                      prefix={<MailTwoTone />}
                      placeholder="Indirizzo email"
                    />
                  </Form.Item>
                  <span className={classes.mailRecovery}>Non ricordi l'indirizzo email?</span>
                  <Row className={classes.actionRow} justify='space-between'>
                    <Button type="text">
                      Create an account
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Avanti
                    </Button>
                  </Row>
                </Form>
              </Col>
            </Row>

            <Row gutter={[0, 32]}>
              <Col span={24} align={"center"}>
                <img className={classes.logo} src={PandaBambooSrc} alt="Logo" />
                <Typography.Title level={2}>
                  Ciao
                </Typography.Title>
                <Typography.Title level={5}>
                  {email}
                </Typography.Title>
                <span>Verifica innanzitutto la tua identità</span>
              </Col>
              <Col>
                <Form
                  name="basic"
                  onFinish={onLogin}
                  validateMessages={validateMessages}
                  //onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="password"
                    rules={[{ required: true, type: 'string' }]}
                  >
                    <Input
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                      type='password'
                      placeholder="Inserisci la password"
                    />
                  </Form.Item>

                  <Row justify='space-between'>
                    <Button type="text">
                      Password dimenticata?
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Avanti
                    </Button>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Carousel>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
