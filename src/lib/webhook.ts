export const getWebhookUrl = () => {
  return localStorage.getItem('mia_webhook_url') || '';
};

export const setWebhookUrl = (url: string) => {
  localStorage.setItem('mia_webhook_url', url);
};

export async function postToWebhook(payload: any) {
  const url = getWebhookUrl();
  if (!url) throw new Error('Webhook URL not configured');
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'no-cors',
    body: JSON.stringify(payload),
  });
}
