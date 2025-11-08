import React, { useState, useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../../Styled";

const DocumentUpload = ({ onFileSelect, accept = "image/*,.pdf" }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      setSelectedFile(file);

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }

      // Call parent callback
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <UploadContainer>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />

      {!selectedFile ? (
        <DropZone
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          $isDragging={isDragging}
        >
          <UploadIcon>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </UploadIcon>
          <UploadText>
            <strong>Kliknite da odaberete</strong> ili prevucite dokument
          </UploadText>
          <UploadHint>PNG, JPG, PDF (maks. 10MB)</UploadHint>
        </DropZone>
      ) : (
        <PreviewContainer>
          {preview ? (
            <ImagePreview src={preview} alt="Pregled dokumenta" />
          ) : (
            <FileInfo>
              <FileIcon>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
              </FileIcon>
              <FileName>{selectedFile.name}</FileName>
              <FileSize>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </FileSize>
            </FileInfo>
          )}
          <RemoveButton onClick={handleRemove}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </RemoveButton>
        </PreviewContainer>
      )}
    </UploadContainer>
  );
};

export default DocumentUpload;

const UploadContainer = styled.div`
  width: 100%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const DropZone = styled.div`
  border: 2px dashed
    ${(props) => (props.$isDragging ? COLORS.indigo : COLORS.gray200)};
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.$isDragging ? "rgba(79, 70, 229, 0.05)" : "transparent"};

  &:hover {
    border-color: ${COLORS.indigo};
    background-color: rgba(79, 70, 229, 0.02);
  }
`;

const UploadIcon = styled.div`
  color: ${COLORS.indigo};
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const UploadText = styled.p`
  font-size: 14px;
  color: ${COLORS.gray700};
  margin-bottom: 8px;

  strong {
    color: ${COLORS.indigo};
    font-weight: 600;
  }
`;

const UploadHint = styled.p`
  font-size: 12px;
  color: ${COLORS.gray500};
`;

const PreviewContainer = styled.div`
  position: relative;
  border: 1px solid ${COLORS.gray200};
  border-radius: 12px;
  padding: 20px;
  background-color: #f9fafb;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const FileIcon = styled.div`
  color: ${COLORS.indigo};
`;

const FileName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.gray700};
  word-break: break-word;
  text-align: center;
`;

const FileSize = styled.p`
  font-size: 12px;
  color: ${COLORS.gray500};
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border: 1px solid ${COLORS.gray200};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${COLORS.gray600};

  &:hover {
    background-color: #fee;
    border-color: #ef4444;
    color: #ef4444;
  }
`;
