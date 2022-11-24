import { downloadResume } from '../apis/resume'

/**
 * Download user created resume
 * @param name titile of the resume
 * @param id resume object _id
 * @param type document type to download
 * @param setNotify from useNotify()
 * @returns void
 */
export const handleResumeDownload = async (
  name: string,
  id: string,
  type: 'pdf' | 'docx' | 'txt',
  setNotify: (_val: any) => void
) => {
  const res: any = await downloadResume(id, type)

  if (res && res.data) {
    const docName = name ? name.replaceAll(/\s/g, '-') : 'untitled-resume'

    const filename = docName + '.' + type

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return window.URL.revokeObjectURL(url)
  }

  return setNotify({
    type: 'danger',
    heading: 'Err!',
    message: 'Failed to donwload design',
  })
}
