import React, { useRef, useMemo, useCallback } from 'react';
import ReactQuill from 'react-quill';
import axiosInstance from 'helpers/axiosInstance';
import { compressImage } from 'utils/imageCompression';

const Editor = ({
  textQuillStandard = '',
  // setTextQuillStandard = () => {},
  onBlur = () => {},
  onChange = () => {},
  onKeyDown = () => {},
  enableImageUpload = true,
  maxImageWidth = 1920,
  maxImageHeight = 1080,
  imageQuality = 0.8,
}) => {
  const quillRef = useRef(null);

  const imageHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        // Show loading indicator
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const range = quill.getSelection(true);
        quill.insertText(range.index, 'Uploading image...', 'user');
        quill.setSelection(range.index + 20);

        // Compress the image
        const compressedFile = await compressImage(
          file,
          maxImageWidth,
          maxImageHeight,
          imageQuality
        );

        // Upload to server
        const formData = new FormData();
        formData.append('media', compressedFile);

        const response = await axiosInstance.post('/media', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.success && response.data?.local_path) {
          // Remove loading text and insert image
          quill.deleteText(range.index, 20);
          // Convert relative path to full URL
          const imagePath = response.data.local_path;
          const imageUrl = imagePath.startsWith('http')
            ? imagePath
            : `${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${imagePath}`;
          quill.insertEmbed(range.index, 'image', imageUrl);
          quill.setSelection(range.index + 1);
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Image upload error:', error);
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.deleteText(range.index, 20);
          quill.insertText(range.index, 'Image upload failed', 'user');
        }
      }
    };
  }, [maxImageWidth, maxImageHeight, imageQuality]);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: enableImageUpload ? imageHandler : undefined,
        },
      },
    }),
    [enableImageUpload, imageHandler]
  );

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  // Handle paste events to compress and upload pasted images
  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i += 1) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const blob = items[i].getAsFile();
        const file = new File([blob], `pasted-image-${Date.now()}.png`, {
          type: blob.type,
        });

        // Trigger image upload
        setTimeout(async () => {
          try {
            const quill = quillRef.current?.getEditor();
            if (!quill) return;

            const range = quill.getSelection(true);
            quill.insertText(range.index, 'Uploading image...', 'user');
            quill.setSelection(range.index + 20);

            const compressedFile = await compressImage(
              file,
              maxImageWidth,
              maxImageHeight,
              imageQuality
            );

            const formData = new FormData();
            formData.append('media', compressedFile);

            const response = await axiosInstance.post('/media', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            if (response.success && response.data?.local_path) {
              quill.deleteText(range.index, 20);
              // Convert relative path to full URL
              const imagePath = response.data.local_path;
              const imageUrl = imagePath.startsWith('http')
                ? imagePath
                : `${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${imagePath}`;
              quill.insertEmbed(range.index, 'image', imageUrl);
              quill.setSelection(range.index + 1);
            } else {
              throw new Error('Upload failed');
            }
          } catch (error) {
            console.error('Pasted image upload error:', error);
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const range = quill.getSelection(true);
              quill.deleteText(range.index, 20);
              quill.insertText(range.index, 'Image upload failed', 'user');
            }
          }
        }, 0);
        break;
      }
    }
  };

  return (
    <div
      onPaste={handlePaste}
      className="editor-full-height"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={textQuillStandard || ''}
        onChange={(val) => {
          // setTextQuillStandard(val);
          onChange(val);
        }}
        onKeyDown={onKeyDown}
        modules={quillModules}
        formats={quillFormats}
        onBlur={onBlur}
      />
      <style>{`
        .editor-full-height {
          height: 100%;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .editor-full-height .quill {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .editor-full-height .ql-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 0;
        }
        .editor-full-height .ql-editor {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
          word-wrap: break-word;
          word-break: normal;
          white-space: normal;
        }
        .editor-full-height .ql-editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 10px auto;
          border-radius: 4px;
        }
        .editor-full-height .ql-editor p {
          margin: 0;
          padding: 0;
          word-wrap: break-word;
          white-space: normal;
        }
        .editor-full-height .ql-editor p img {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default Editor;
