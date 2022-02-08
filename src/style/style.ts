import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1130px;
  margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    margin: 0 20px;
  }
`;
export const ContentTitleWrap = styled.div`
  margin-bottom: 32px;
  h2 {
    font-size: 20px;
    line-height: 32px;
    font-weight: 700;
    margin: 0;
  }
  span {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;
export const FilterWrap = styled.div`
  position: relative;
`;
export const FilterButton = styled.button`
  border: 1px solid #939fa5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px 12px;
  padding-right: 30px;
  margin-right: 8px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #939fa5 transparent transparent transparent;
  }
  &: hover {
    border: 1px solid #2196f3;
`;

export const FilterListWrap = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 4;
  top: 30px;
  left: 0px;
  width: fit-content;
  background: #ffffff;
  border: 1px solid #939fa5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 17px 38px 17px 12px;
  margin: 0;
`;
export const FilterList = styled.li`
  width: fit-content;
  white-space: nowrap;
  input {
    margin-right: 10px;
  }
`;

export const CardContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;

  @media ${(props) => props.theme.mobile} {
    flex-direction: row;
  }
`;
export const CheckBoxWrapper = styled.div`
  position: relative;
`;
export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 15px;
  left: 0;
  width: 34px;
  height: 14px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: -5px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
export const CheckBox = styled.input`
  opacity: 0;
  z-index: 3;
  border-radius: 15px;
  width: 42px;
  height: 24px;
  &:checked + ${CheckBoxLabel} {
    background: #bbdefb;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      margin-left: 21px;
      transition: 0.2s;
      background: #2196f3;
    }
  }
`;

export const ResetButton = styled.button`
  background-color: transparent;
  border: 0px;
  color: #2196f3;
  font-size: 12px;
  img {
    width: 13px;
    padding-right: 12px;
  }
`;

export const CardWrap = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 24px 16px;
  width: 360px;
  &: hover {
    background-color: #ffffff;
    border: 2px solid #2196f3;
    border-radius: 4px;
  }
`;

export const CardTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
`;

export const Statusicon = styled.span`
  border: 1px solid #ffa000;
  box-sizing: border-box;
  border-radius: 12px;
  color: #ffa000;
  font-size: 12px;
  padding: 2px 8px;
  line-height: 20px;
`;
export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const FlexStart = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const SpaceBetweenMo = styled(SpaceBetween)`
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;
export const CardContent = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;
export const CardContentGray = styled(CardContent)`
  margin-top: 32px;
  color: #939fa5;
`;
export const Table = styled.table`
  font-size: 14px;
  border-collapse: collapse;
  margin: 32px 0;
`;
export const TR = styled.tr``;
export const TH = styled.th`
  font-weight: 500;
  text-align: left;
  padding-right: 32px;
  padding-bottom: 8px;
`;
export const TD = styled.td`
  font-weight: 700;
  text-align: left;
`;

export const Button = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  background-color: #2196f3;
  border: 1px solid #2196f3;
  font-size: 14px;
  padding: 6ps 12px;
  color: #fff;
`;

export const BorderButton = styled(Button)`
  background-color: #fff;
  color: #2196f3;
  margin-left: 8px;
`;
