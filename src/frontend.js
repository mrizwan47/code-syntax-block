document.addEventListener('DOMContentLoaded', function () {
	const copyButtons = document.querySelectorAll('.code-syntax-block-copy-button');

	copyButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			const preElement = this.closest('pre');
			if (!preElement) return;

			const codeElement = preElement.querySelector('code');
			if (!codeElement) return;

			const codeToCopy = codeElement.innerText;

			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(codeToCopy).then(function () {
					const originalButtonText = button.innerText;
					button.innerText = 'Copied!';
					setTimeout(function () {
						button.innerText = originalButtonText;
					}, 2000);
				}).catch(function (err) {
					console.error('Failed to copy code: ', err);
					// Fallback for older browsers or HTTP
					tryCopyTextToClipboardFallback(codeToCopy, button);
				});
			} else {
				// Fallback for older browsers or HTTP
				tryCopyTextToClipboardFallback(codeToCopy, button);
			}
		});
	});

	function tryCopyTextToClipboardFallback(text, button) {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.width = '2em';
		textArea.style.height = '2em';
		textArea.style.padding = '0';
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';
		textArea.style.background = 'transparent';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand('copy');
			if (successful) {
				const originalButtonText = button.innerText;
				button.innerText = 'Copied!';
				setTimeout(function () {
					button.innerText = originalButtonText;
				}, 2000);
			} else {
				console.error('Fallback: Oops, unable to copy');
				alert('Failed to copy. Please try again or copy manually.');
			}
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
			alert('Failed to copy. Please try again or copy manually.');
		}

		document.body.removeChild(textArea);
	}
});
