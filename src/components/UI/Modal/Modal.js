import React, { useRef } from 'react';
import classes from './Modal.module.scss';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

const Modal = (props) => {
  const nodeRefBackdrop = useRef(null);
  const nodeRefModal = useRef(null);

  return (
    <React.Fragment>
      <CSSTransition
        in={props.showModal}
        timeout={300}
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRefBackdrop}
        classNames={{
          enterActive: classes.BackdropOpen,
          exitActive: classes.BackdropClosed,
        }}
      >
        <div
          className={classes.Backdrop}
          ref={nodeRefBackdrop}
          onClick={props.closeModal}
        ></div>
      </CSSTransition>
      <CSSTransition
        in={props.showModal}
        timeout={300}
        nodeRef={nodeRefModal}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: classes.ModalOpen,
          exitActive: classes.ModalClosed,
        }}
      >
        <div className={classes.Modal} ref={nodeRefModal} onClick={props.clicked}>
          {props.children}
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Modal;
