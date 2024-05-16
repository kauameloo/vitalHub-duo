import styled, { css } from "styled-components";

export const InputText = styled.TextInput`
  width: 90%;
  border: 2px solid #49b3ba;
  font-family: MontserratAlternates_600SemiBold;
  color: #49b3ba;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
`;

export const InputNumeric = styled.TextInput`
  text-align: center;
  width: 65px;
  height: 62px;
  border: 2px solid #77cacf;
  font-family: MontserratAlternates_600SemiBold;
  color: #34898f;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
`;

export const InputProfile = styled.TextInput`
  background-color: #f5f3f3;
  padding-left: 15px;
  text-align: left;
  /* width:90%; */
  height: 55px;
  border: 1px solid #f5f3f3;
  font-family: MontserratAlternates_500Medium;
  color: #33303e;
  border-radius: 8px;
  /* padding: 20px;
margin-top: 10px;
margin-bottom: 5px; */
  font-size: 16px;
`;
export const InputHigh = styled(InputText)`
  /* padding-bottom: 82px; */
  padding-top: -50px;
  height: 125px;
  width: 100%;
`;
export const InputHighGrey = styled(InputHigh)`
  border: 1px solid #f5f3f3;
  color: #33303e;
  background-color: #f5f3f3;
  font-family: MontserratAlternates_500Medium;
  height: 130px;
  text-align: left;
  padding-left: 15px;
  padding-top: -200px;
`;

export const InputTextLarge = styled(InputText)`
  width: 100%;
`;
