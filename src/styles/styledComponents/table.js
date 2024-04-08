import styled from 'styled-components';

export const Pagination = styled.div`
  width: 50%;
  height: 4vh;
  margin: 0 auto;
  padding: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  border: ${(props) => (props.mode === 'dark' ? '1px solid white' : 'none')};

  .previous {
    outline: none;
    color: ${(props) => (props.mode === 'dark' ? 'white' : '#000')};
  }
  .next {
    outline: none;
    color: ${(props) => (props.mode === 'dark' ? 'white' : '#000')};
  }

  .arrow {
    color: ${(props) => (props.mode === 'dark' ? 'white' : '#000')};
  }

  .pageoption {
    button {
      border-radius: 50%;
      font-size: 12px;
      height: 15px;
      width: 15px;
      line-height: 15px;
      outline: none;
      color: ${(props) => (props.mode === 'dark' ? 'white' : '#000')};
    }
  }

  .active {
    background: ${(props) => (props.mode === 'dark' ? 'white' : '#000')};
    color: ${(props) => (props.mode === 'dark' ? '#000' : 'white')} !important;
    border: ${(props) => (props.mode === 'dark' ? '1px solid white' : 'none')};
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 7px;
    .pageoption {
      button {
        font-size: 11px;
        height: 16px;
        width: 16px;
        line-height: 15px;
      }
    }
  }
`;

export const Customselect = styled.div`
  margin: 0;
  margin-left: 20px;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  background-color: #3bc48d;
  color: white;
  border-radius: 4px;
  height: 30px;
  outline: none;
  select {
    outline: none;
    color: black;
    font-size: 14px;
    font-weight: normal;
    max-width: 100%;
    padding: 5px 10px 0 10px;
    border: none;
    background-color: transparent;
    appearance: none;
  }
`;
