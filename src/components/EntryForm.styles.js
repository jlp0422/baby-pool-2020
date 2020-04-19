import styled from '@emotion/styled'

export const Form = styled.form`
  margin: 2rem auto;
  padding: 0;
`

export const FormContent = styled.div`
  width: 100%;
  margin: 0 auto;
  > p {
    font-size: 1.3rem;
    letter-spacing: 0.1em;
    text-indent: 0.25rem;
    text-transform: uppercase;
  }
`

export const FormLabel = styled.label`
  color: #666;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  text-indent: 0.25rem;
  text-transform: uppercase;
`

export const FormInput = styled.input`
  border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 1.6rem;
  line-height: 2rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid #444;
  display: block;
  width: 100%;
  margin: 0 0 1.2rem;
`

export const FormInputDate = styled(FormInput)`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

export const FormInputRange = styled(FormInput)`
  -webkit-appearance: none;
  width: 100%;
  margin: 7.3px 0;
  padding: 0;
  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 11.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #00bfff;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  ::-webkit-slider-thumb {
    box-shadow: 0.9px 0.9px 1px #000031, 0px 0px 0.9px #00004b;
    border: 1.8px solid #00001e;
    height: 26px;
    width: 26px;
    border-radius: 15px;
    background: #d7ffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7.5px;
  }
  :focus::-webkit-slider-runnable-track {
    background: #00bfff;
  }
  ::-moz-range-track {
    width: 100%;
    height: 11.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #00bfff;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  ::-moz-range-thumb {
    box-shadow: 0.9px 0.9px 1px #000031, 0px 0px 0.9px #00004b;
    border: 1.8px solid #00001e;
    height: 26px;
    width: 26px;
    border-radius: 15px;
    background: #d7ffff;
    cursor: pointer;
  }
  ::-ms-track {
    width: 100%;
    height: 11.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  ::-ms-fill-lower {
    background: rgba(42, 100, 149, 0.78);
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  ::-ms-fill-upper {
    background: #00bfff;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  ::-ms-thumb {
    box-shadow: 0.9px 0.9px 1px #000031, 0px 0px 0.9px #00004b;
    border: 1.8px solid #00001e;
    height: 26px;
    width: 26px;
    border-radius: 15px;
    background: #d7ffff;
    cursor: pointer;
    height: 11.4px;
  }
  :focus::-ms-fill-lower {
    background: #00bfff;
  }
  :focus::-ms-fill-upper {
    background: #00bfff;
  }
`

export const FormSelect = styled.select`
  font-size: 1.5rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid #444;
  display: block;
  width: 100%;
  margin: 0 0 1.2rem;
`

export const FormButton = styled.button`
  border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-top: 2rem;
  padding: 0.5rem;
  background: #00bfff;
  border: 1px solid #00bfff;
  color: #fff;
  font-weight: bold;
  width: 125px;
  box-shadow: 1px 2px 5px #888888
`
