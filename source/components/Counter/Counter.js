// Core
import React from "react";
import PropTypes from "prop-types";

// Instruments
import styles from "./styles.m.css";

const Counter = ({ count }) => {
    return <section className = { styles.counter }>Post count: {count}</section>;
};

Counter.ptopTypes = {
    posts: PropTypes.string,
};

export default Counter;
