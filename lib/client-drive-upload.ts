// lib/client-drive-upload.ts

export async function uploadFileToGoogleDrive(
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ fileId: string; fileUrl: string; fileName: string }> {
  // 1. Get access token from our server
  const tokenRes = await fetch('/api/drive-token');
  if (!tokenRes.ok) throw new Error('Failed to get upload token');
  const { accessToken, folderId } = await tokenRes.json();

  // 2. Upload file directly to Google Drive
  const metadata = {
    name: file.name,
    parents: [folderId],
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        resolve({
          fileId: result.id,
          fileUrl: `https://drive.google.com/file/d/${result.id}/view`,
          fileName: file.name,
        });
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Upload failed')));

    xhr.open(
      'POST',
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink'
    );
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.send(form);
  });
}