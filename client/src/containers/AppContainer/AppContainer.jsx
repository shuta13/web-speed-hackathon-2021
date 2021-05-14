import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, useLocation } from 'react-router-dom';

import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

const AppPage = lazy(() => import('../../components/application/AppPage'));
const NotFoundContainer = lazy(() => import('../NotFoundContainer'));
const AuthModalContainer = lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = lazy(() => import('../NewPostModalContainer'));
const PostContainer = lazy(() => import('../PostContainer'));
const TermContainer = lazy(() => import('../TermContainer'));
const TimelineContainer = lazy(() => import('../TimelineContainer'));
const UserProfileContainer = lazy(() => import('../UserProfileContainer'));

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <Suspense fallback={<div>読込中...</div>}>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Switch>
          <Route exact path="/">
            <TimelineContainer />
          </Route>
          <Route exact path="/users/:username">
            <UserProfileContainer />
          </Route>
          <Route exact path="/posts/:postId">
            <PostContainer />
          </Route>
          <Route exact path="/terms">
            <TermContainer />
          </Route>
          <Route path="*">
            <NotFoundContainer />
          </Route>
        </Switch>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </Suspense>
  );
};

export { AppContainer };
