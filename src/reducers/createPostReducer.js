//Note: not returning false universalError will send the form
const initialState = {
  heading: '',
  content: '',
  isFormUploading: false,
  formUploaded: false,
  category: '',
  fileSizeError: false,
  isFileSelected: false,
  universalError: false,
  headingErrorText: null,
};
// clear/return universalError when state/things changes
function reducer(state, action) {
  switch (action.type) {
    case 'CATEGORY_CHANGED': {
      return { ...state, category: action.payload, universalError: false };
    }
    case 'HEADING_CHANGED': {
      return { ...state, heading: action.payload, universalError: false };
    }
    case 'CONTENT_CHANGED': {
      return { ...state, content: action.payload, universalError: false };
    }
    case 'FILE_CHANGED': {
      return fileChanged({ state, action });
    }
    //validate here
    case 'FORM_UPLOAD_CLICK': {
      return formUploadClick({ state, action });
    }
    // when form is uploaded to the cloud
    case 'FORM_UPLOAD_SUCCESS': {
      // clear the form, set to intial state
      return { ...initialState, formUploaded: true };
    }
    default: {
      return { ...initialState };
    }
  }
}

function formUploadClick({ state, action }) {
  //validate heading length
  var [isHeadingErr, errTxt] = validateHeading(state.heading);
  if (isHeadingErr) {
    action.headRef.current.focus();
    return {
      ...state,
      headingErrorText: errTxt, // for helperText in mui input box
      universalError: 'please check heading word size!',
    };
  }
  //if file is not selected
  if (!state.isFileSelected) {
    return {
      ...state,
      universalError: 'please select file to upload!',
    };
  } else if (state.fileSizeError) {
    return {
      ...state,
      universalError: `File size must be less than 3MB`,
    };
  }
  return { ...state, universalError: false, isFormUploading: true };
}

function fileChanged({ state, action }) {
  let sizeBytes = action.payload['files'][0]['size'];
  let sizeMb = sizeBytes / 1024 / 1024;
  // set file size limit
  if (sizeMb > 3)
    return {
      ...state,
      isFileSelected: true,
      universalError: 'file size should be less than 3 mb',
      fileSizeError: true,
    };
  else
    return {
      ...state,
      isFileSelected: true,
      fileSizeError: false,
      universalError: false,
    };
}

//helpers
const countWords = (text) => {
  return text.split(' ').length;
};

const validateHeading = (text) => {
  const len = countWords(text);
  if (len < 6) return [true, 'Heading must contain more than 5 words'];
  else if (len > 20) return [true, 'Heading must contain less than 20 words'];
  else return [false, `word length ${len}`];
};

export { initialState, reducer };
