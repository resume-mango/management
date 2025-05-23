import React, { forwardRef, Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactQuill from 'react-quill'
import styled from 'styled-components'

interface IProps {
  name: string
  maxHeight?: string
  placeholder?: string
  modules?: any
  formats?: Array<string>
  disabled?: boolean
  ref: any
}

const RichTextEditor = forwardRef(
  (
    {
      name,
      maxHeight = '',
      formats,
      modules,
      disabled = false,
      placeholder,
    }: IProps,
    ref
  ) => {
    const { control } = useFormContext()
    const initialModules = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link'],
        ['clean'],
      ],
    }

    const initialFormats = [
      'bold',
      'italic',
      'underline',
      'list',
      'bullet',
      'link',
    ]

    // useEffect(() => {
    //   const linkInput = document && document.querySelector('.ql-tooltip input')
    //   linkInput && linkInput.setAttribute('data-link', 'https://www.example.com')

    //   return
    // }, [])

    return (
      <Fragment>
        <Wrapper
          maxHeight={maxHeight}
          disabled={disabled}
          id="rich-text-editor"
        >
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <ReactQuill
                ref={ref as any}
                modules={modules ? modules : initialModules}
                onBlur={onBlur}
                onChange={(content) => onChange(content)}
                value={value}
                formats={formats ? formats : initialFormats}
                theme="snow"
                bounds={'#rich-text-editor'}
                readOnly={disabled}
                placeholder={placeholder}
              />
            )}
          />
        </Wrapper>
      </Fragment>
    )
  }
)

export default RichTextEditor

const Wrapper = styled.div<{ maxHeight: string; disabled: boolean }>`
  .quill {
    background-color: #f4f5f7;
    border-radius: 6px;
    display: block;
  }
  .ql-toolbar,
  .ql-container {
    border: none;
    display: block;
    ${({ maxHeight }) =>
      maxHeight && `max-height: ${maxHeight}; overflow-y: scroll;`}
  }
  .ql-toolbar {
    padding-top: 1rem;
    span.ql-formats {
      &:not(:last-child) {
        border-right: 2px solid #ddd;
      }
      button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        svg {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }
    .ql-formats {
      margin-right: 0.5rem;
      padding-right: 0.5rem;
    }
    .ql-stroke {
      stroke: #898989;
    }
  }

  .ql-editor {
    min-height: 150px;

    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.7rem;
    }
    h3 {
      font-size: 1.5rem;
    }
    h4 {
      font-size: 1.2rem;
    }
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.875rem;
    }
    p,
    li,
    span,
    a {
      font-size: inherit;
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
      &:hover {
        text-decoration: underline;
      }
    }

    ${({ disabled, theme }) =>
      disabled &&
      ` background: ${theme.colors.grey};
         user-select: none;
          pointer-events: none;
`}
  }
  .ql-editor.ql-blank::before {
    font-style: unset;
  }
  .ql-editor ol,
  .ql-editor ul {
    padding-left: 0.5em;
  }
  .ql-tooltip {
    z-index: 10;
    border: none;
    border-radius: 4px;
    z-index: 100;
    &[data-mode='link']:before {
      content: 'Link';
    }
    &:before {
      content: '';
    }
    input[type='text'] {
      border: 1px solid #f4f5f7;
      font-size: 1rem;
      height: 40px;
      width: 201px;
    }

    .ql-preview {
      margin-right: 1rem;
      text-decoration: underline;
    }
    &.ql-editing {
      a.ql-action {
        &:after {
          position: relative;
          top: 4px;
          line-height: 1;
          content: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="%2306c" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>');
          filter: grayscale(1);
          opacity: 0.5;
        }
        &:hover {
          &:before {
            filter: grayscale(0);
            opacity: 1;
          }
        }
      }
    }
    a.ql-remove {
      &:before {
        position: relative;
        top: 3px;
        margin-left: 0.5rem !important;
        content: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="%2306c" d="M6.08594 2.13281H5.90625C6.00508 2.13281 6.08594 2.05195 6.08594 1.95312V2.13281H12.9141V1.95312C12.9141 2.05195 12.9949 2.13281 13.0938 2.13281H12.9141V3.75H14.5312V1.95312C14.5312 1.16025 13.8866 0.515625 13.0938 0.515625H5.90625C5.11338 0.515625 4.46875 1.16025 4.46875 1.95312V3.75H6.08594V2.13281ZM17.4062 3.75H1.59375C1.19619 3.75 0.875 4.07119 0.875 4.46875V5.1875C0.875 5.28633 0.955859 5.36719 1.05469 5.36719H2.41133L2.96611 17.1143C3.00205 17.8802 3.63545 18.4844 4.40137 18.4844H14.5986C15.3668 18.4844 15.9979 17.8824 16.0339 17.1143L16.5887 5.36719H17.9453C18.0441 5.36719 18.125 5.28633 18.125 5.1875V4.46875C18.125 4.07119 17.8038 3.75 17.4062 3.75ZM14.4257 16.8672H4.57432L4.03076 5.36719H14.9692L14.4257 16.8672Z"/></svg>') !important;
        filter: grayscale(1);
        opacity: 0.5;
      }
      &:hover {
        &:before {
          filter: grayscale(0);
          opacity: 1;
        }
      }
    }
  }
`
