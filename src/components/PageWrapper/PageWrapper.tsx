import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../Container/Container';
import styles from './PageWrapper.module.css';

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Container className={styles.headerContainer}>
          <NavLink exact to="/" activeClassName={styles.activeLink}>
            Home
          </NavLink>

          <div>
            <NavLink
              to="/users"
              style={{ marginRight: 20 }}
              activeClassName={styles.activeLink}
            >
              Users
            </NavLink>

            <NavLink to="/cards" activeClassName={styles.activeLink}>
              Cards
            </NavLink>
          </div>
        </Container>
      </Header>
      <Content className={styles.content}>
        <Container>{children}</Container>
      </Content>
      <Footer className={styles.footer}>
        <Container>Created by Inga Volosnikova</Container>
      </Footer>
    </Layout>
  );
};
