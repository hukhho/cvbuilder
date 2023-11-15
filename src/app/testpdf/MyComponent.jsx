// components/MyComponent.js

import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: red;
  font-size: 1.5em;
`;

const MyComponent = () => (
  <StyledDiv>
    Hello
  </StyledDiv>
);

export default MyComponent;