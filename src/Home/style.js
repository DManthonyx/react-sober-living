import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  justify-content: space-evenly;
`
export const DivImgBox = styled.div`
  width: 37%;
  height: 300px;
  margin: 0 auto;
  position: relative;
  &:hover Img {
    opacity: .3;
  }
  &:hover > Div {
    opacity: 1;
  }
`
export const Img = styled.img`
  opacity: 1;
  display: block;
  width: 100%;
  height: 300px;
  transition: 1s ease;
`
export const Div = styled.div`
  opacity: 0;
  transition: 1s ease;
`
export const DivContent = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  white-space: no-wrap;
  overflow: hidden;
  letter-spacing: 2px;
`
export const H2 = styled.h2`

`
export const Button = styled.button`
  display: block;
  font-size: 24px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  margin: 10px 0px 0px 0px;
  background: black;
  color: white;
  border: black;
  height: 50px;
  font-family: beautiful;
  cursor: pointer;
`
export const Container = styled.div`
  display: flex;
  width: 99%;
  border-top: 3px solid gray;
  padding-top: 11px;
`