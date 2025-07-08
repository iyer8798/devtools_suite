// Application data
const toolsData = [
    {
        "id": "base64-encoder",
        "name": "Base64 Encoder/Decoder",
        "description": "Encode and decode text to/from Base64 format",
        "category": "encoding",
        "icon": "🔐"
    },
    {
        "id": "lorem-generator",
        "name": "Lorem Text Generator",
        "description": "Generate Lorem Ipsum placeholder text",
        "category": "content",
        "icon": "📝"
    },
    {
        "id": "special-chars",
        "name": "Special Character Generator",
        "description": "Convert text to fancy Unicode characters",
        "category": "text",
        "icon": "✨"
    },
    {
        "id": "unicode-generator",
        "name": "Unicode Text Generator",
        "description": "Generate random Unicode characters",
        "category": "text",
        "icon": "🌐"
    },
    {
        "id": "language-snippets",
        "name": "Language Snippet Generator",
        "description": "Generate code snippets in various languages",
        "category": "code",
        "icon": "💻"
    },
    {
        "id": "fake-data",
        "name": "Fake Data Generator",
        "description": "Generate realistic fake data for testing",
        "category": "data",
        "icon": "🎭"
    },
    {
        "id": "word-counter",
        "name": "Word Counter",
        "description": "Count words, characters, and analyze text",
        "category": "analysis",
        "icon": "📊"
    },
    {
        "id": "char-counter",
        "name": "Character Counter",
        "description": "Count characters and analyze text composition",
        "category": "analysis",
        "icon": "🔢"
    },
    {
        "id": "hash-generator",
        "name": "Hash Generator",
        "description": "Generate MD5, SHA-1, SHA-256 hashes",
        "category": "security",
        "icon": "🔒"
    },
    {
        "id": "password-generator",
        "name": "Password Generator",
        "description": "Generate secure passwords with custom options",
        "category": "security",
        "icon": "🛡️"
    },
    {
        "id": "text-case",
        "name": "Text Case Converter",
        "description": "Convert text between different cases",
        "category": "text",
        "icon": "🔤"
    },
    {
        "id": "diff-checker",
        "name": "Diff Checker",
        "description": "Compare two texts and show differences",
        "category": "comparison",
        "icon": "🔍"
    },
    {
        "id": "markdown-editor",
        "name": "Markdown Editor",
        "description": "Edit Markdown with live preview",
        "category": "editor",
        "icon": "📄"
    },
    {
        "id": "color-picker",
        "name": "Color Hex Indicator",
        "description": "Pick colors and get hex, RGB, HSL values",
        "category": "design",
        "icon": "🎨"
    },
    {
        "id": "qr-generator",
        "name": "QR Code Generator",
        "description": "Generate QR codes for text and URLs",
        "category": "utility",
        "icon": "📱"
    },
    {
        "id": "markdown-converter",
        "name": "Markdown Converter",
        "description": "Convert Markdown to HTML and vice versa",
        "category": "converter",
        "icon": "🔄"
    },
    {
        "id": "html-formatter",
        "name": "HTML Formatter",
        "description": "Format and beautify HTML code",
        "category": "formatter",
        "icon": "🏷️"
    },
    {
        "id": "image-converter",
        "name": "Image Converter",
        "description": "Convert between image formats",
        "category": "media",
        "icon": "🖼️"
    }
];

const languages = [
    "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Rust", "Swift",
    "Hindi", "Tamil", "Bengali", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam",
    "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Chinese", "Japanese"
];

// Application state
let currentTheme = 'light';
let filteredTools = toolsData;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    renderTools();
    setupEventListeners();
});

function initializeApp() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Modal events
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-color-scheme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    
    localStorage.setItem('theme', theme);
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredTools = toolsData.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.category.toLowerCase().includes(searchTerm)
    );
    renderTools();
}

function renderTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';
    
    filteredTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <span class="tool-card-icon">${tool.icon}</span>
            <h3 class="tool-card-title">${tool.name}</h3>
            <p class="tool-card-description">${tool.description}</p>
            <span class="tool-card-category">${tool.category}</span>
        `;
        toolCard.addEventListener('click', () => openTool(tool.id));
        toolsGrid.appendChild(toolCard);
    });
}

function openTool(toolId) {
    const tool = toolsData.find(t => t.id === toolId);
    if (!tool) return;
    
    document.getElementById('modalTitle').textContent = tool.name;
    document.getElementById('modalBody').innerHTML = getToolHTML(toolId);
    document.getElementById('modalOverlay').classList.add('active');
    
    // Initialize tool-specific functionality
    initializeTool(toolId);
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

function getToolHTML(toolId) {
    switch(toolId) {
        case 'base64-encoder':
            return `
                <div class="tool-section">
                    <h3>Input Text</h3>
                    <textarea class="form-control textarea-large" id="base64Input" placeholder="Enter text to encode/decode"></textarea>
                    <div class="tool-controls">
                        <button class="btn btn--primary" onclick="encodeBase64()">Encode</button>
                        <button class="btn btn--secondary" onclick="decodeBase64()">Decode</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Output</h3>
                    <div class="tool-result" id="base64Output">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('base64Output')">Copy</button>
                        <span id="base64Result">Result will appear here</span>
                    </div>
                </div>
            `;
            
        case 'lorem-generator':
            return `
                <div class="tool-section">
                    <h3>Generate Lorem Text</h3>
                    <div class="tool-controls">
                        <select class="form-control" id="loremType">
                            <option value="paragraph">Paragraph</option>
                            <option value="word">Word</option>
                            <option value="sentence">Sentence</option>
                        </select>
                        <input type="number" class="form-control" id="loremLength" placeholder="Length (max 100)" min="1" max="100" value="5">
                        <button class="btn btn--primary" onclick="generateLorem()">Generate</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Generated Text</h3>
                    <div class="tool-result" id="loremOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('loremOutput')">Copy</button>
                        <span id="loremResult">Generated text will appear here</span>
                    </div>
                </div>
            `;
            
        case 'special-chars':
            return `
                <div class="tool-section">
                    <h3>Input Text</h3>
                    <textarea class="form-control textarea-small" id="specialInput" placeholder="Enter text to convert"></textarea>
                    <div class="tool-controls">
                        <button class="btn btn--primary" onclick="generateSpecialChars('bold')">Bold</button>
                        <button class="btn btn--primary" onclick="generateSpecialChars('italic')">Italic</button>
                        <button class="btn btn--primary" onclick="generateSpecialChars('circled')">Circled</button>
                        <button class="btn btn--primary" onclick="generateSpecialChars('squares')">Squares</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Special Characters</h3>
                    <div class="tool-result" id="specialOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('specialOutput')">Copy</button>
                        <span id="specialResult">Special characters will appear here</span>
                    </div>
                </div>
            `;
            
        case 'unicode-generator':
            return `
                <div class="tool-section">
                    <h3>Unicode Range</h3>
                    <div class="tool-controls">
                        <input type="number" class="form-control" id="unicodeStart" placeholder="Start (decimal)" value="32">
                        <input type="number" class="form-control" id="unicodeEnd" placeholder="End (decimal)" value="126">
                        <input type="number" class="form-control" id="unicodeLength" placeholder="Length" value="10" min="1" max="100">
                        <button class="btn btn--primary" onclick="generateUnicode()">Generate</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Generated Unicode</h3>
                    <div class="tool-result" id="unicodeOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('unicodeOutput')">Copy</button>
                        <span id="unicodeResult">Unicode text will appear here</span>
                    </div>
                </div>
            `;
            
        case 'language-snippets':
            return `
                <div class="tool-section">
                    <h3>Language Selection</h3>
                    <div class="tool-controls">
                        <select class="form-control" id="snippetLanguage">
                            ${languages.map(lang => `<option value="${lang}">${lang}</option>`).join('')}
                        </select>
                        <button class="btn btn--primary" onclick="generateSnippet()">Generate Snippet</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Code Snippet</h3>
                    <div class="tool-result" id="snippetOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('snippetOutput')">Copy</button>
                        <pre id="snippetResult">Select a language and click Generate Snippet</pre>
                    </div>
                </div>
            `;
            
        case 'fake-data':
            return `
                <div class="tool-section">
                    <h3>Data Fields</h3>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="firstName" checked>
                            <label for="firstName">First Name</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="lastName" checked>
                            <label for="lastName">Last Name</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="email" checked>
                            <label for="email">Email</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="phone">
                            <label for="phone">Phone</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="address">
                            <label for="address">Address</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="company">
                            <label for="company">Company</label>
                        </div>
                    </div>
                    <div class="tool-controls">
                        <input type="number" class="form-control" id="fakeDataCount" placeholder="Count" value="5" min="1" max="100">
                        <button class="btn btn--primary" onclick="generateFakeData()">Generate</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Generated Data</h3>
                    <div class="tool-result" id="fakeDataOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('fakeDataOutput')">Copy</button>
                        <pre id="fakeDataResult">Generated data will appear here</pre>
                    </div>
                </div>
            `;
            
        case 'word-counter':
            return `
                <div class="tool-section">
                    <h3>Text to Analyze</h3>
                    <textarea class="form-control textarea-large" id="wordCountInput" placeholder="Enter text to analyze" oninput="updateWordCount()"></textarea>
                </div>
                <div class="tool-section">
                    <h3>Statistics</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <span class="stat-value" id="wordCount">0</span>
                            <span class="stat-label">Words</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="charCount">0</span>
                            <span class="stat-label">Characters</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="charCountNoSpaces">0</span>
                            <span class="stat-label">Chars (no spaces)</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="paragraphCount">0</span>
                            <span class="stat-label">Paragraphs</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="readingTime">0</span>
                            <span class="stat-label">Reading Time (min)</span>
                        </div>
                    </div>
                </div>
            `;
            
        case 'char-counter':
            return `
                <div class="tool-section">
                    <h3>Text to Analyze</h3>
                    <textarea class="form-control textarea-large" id="charCountInput" placeholder="Enter text to analyze" oninput="updateCharCount()"></textarea>
                </div>
                <div class="tool-section">
                    <h3>Character Analysis</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <span class="stat-value" id="totalChars">0</span>
                            <span class="stat-label">Total Characters</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="lettersCount">0</span>
                            <span class="stat-label">Letters</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="numbersCount">0</span>
                            <span class="stat-label">Numbers</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="spacesCount">0</span>
                            <span class="stat-label">Spaces</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value" id="specialCharsCount">0</span>
                            <span class="stat-label">Special Characters</span>
                        </div>
                    </div>
                </div>
            `;
            
        case 'hash-generator':
            return `
                <div class="tool-section">
                    <h3>Input Text</h3>
                    <textarea class="form-control textarea-large" id="hashInput" placeholder="Enter text to hash"></textarea>
                    <div class="tool-controls">
                        <select class="form-control" id="hashAlgorithm">
                            <option value="sha256">SHA-256</option>
                            <option value="sha1">SHA-1</option>
                            <option value="md5">MD5</option>
                        </select>
                        <select class="form-control" id="hashFormat">
                            <option value="hex">Hex</option>
                            <option value="base64">Base64</option>
                        </select>
                        <div class="checkbox-item">
                            <input type="checkbox" id="hashUppercase">
                            <label for="hashUppercase">Uppercase</label>
                        </div>
                        <button class="btn btn--primary" onclick="generateHash()">Generate Hash</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Hash Output</h3>
                    <div class="tool-result" id="hashOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('hashOutput')">Copy</button>
                        <span id="hashResult">Hash will appear here</span>
                    </div>
                </div>
            `;
            
        case 'password-generator':
            return `
                <div class="tool-section">
                    <h3>Password Options</h3>
                    <div class="slider-container">
                        <label>Length:</label>
                        <input type="range" class="slider" id="passwordLength" min="4" max="50" value="12" oninput="updatePasswordLength()">
                        <span id="passwordLengthValue">12</span>
                    </div>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="includeLowercase" checked>
                            <label for="includeLowercase">Lowercase</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="includeUppercase" checked>
                            <label for="includeUppercase">Uppercase</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="includeNumbers" checked>
                            <label for="includeNumbers">Numbers</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="includeSymbols">
                            <label for="includeSymbols">Symbols</label>
                        </div>
                    </div>
                    <div class="tool-controls">
                        <button class="btn btn--primary" onclick="generatePassword()">Generate Password</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Generated Password</h3>
                    <div class="tool-result" id="passwordOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('passwordOutput')">Copy</button>
                        <span id="passwordResult">Password will appear here</span>
                    </div>
                    <div class="password-strength" id="passwordStrength"></div>
                </div>
            `;
            
        case 'text-case':
            return `
                <div class="tool-section">
                    <h3>Input Text</h3>
                    <textarea class="form-control textarea-large" id="textCaseInput" placeholder="Enter text to convert"></textarea>
                    <div class="tool-controls">
                        <button class="btn btn--primary" onclick="convertCase('uppercase')">UPPERCASE</button>
                        <button class="btn btn--primary" onclick="convertCase('lowercase')">lowercase</button>
                        <button class="btn btn--primary" onclick="convertCase('title')">Title Case</button>
                        <button class="btn btn--primary" onclick="convertCase('sentence')">Sentence case</button>
                        <button class="btn btn--primary" onclick="convertCase('camel')">camelCase</button>
                        <button class="btn btn--primary" onclick="convertCase('snake')">snake_case</button>
                        <button class="btn btn--primary" onclick="convertCase('kebab')">kebab-case</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Converted Text</h3>
                    <div class="tool-result" id="textCaseOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('textCaseOutput')">Copy</button>
                        <span id="textCaseResult">Converted text will appear here</span>
                    </div>
                </div>
            `;
            
        case 'diff-checker':
            return `
                <div class="tool-section">
                    <h3>Text Comparison</h3>
                    <div class="split-view">
                        <div>
                            <h4>Original Text</h4>
                            <textarea class="form-control textarea-large" id="diffOriginal" placeholder="Enter original text"></textarea>
                        </div>
                        <div>
                            <h4>Modified Text</h4>
                            <textarea class="form-control textarea-large" id="diffModified" placeholder="Enter modified text"></textarea>
                        </div>
                    </div>
                    <div class="tool-controls">
                        <button class="btn btn--primary" onclick="compareDiff()">Compare</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Differences</h3>
                    <div class="diff-container" id="diffResult">
                        Differences will appear here
                    </div>
                </div>
            `;
            
        case 'markdown-editor':
            return `
                <div class="tool-section">
                    <h3>Markdown Editor</h3>
                    <div class="split-view">
                        <div>
                            <h4>Editor</h4>
                            <textarea class="form-control textarea-large" id="markdownInput" placeholder="Enter Markdown text" oninput="updateMarkdownPreview()"></textarea>
                        </div>
                        <div>
                            <h4>Preview</h4>
                            <div class="markdown-preview" id="markdownPreview">
                                Preview will appear here
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
        case 'color-picker':
            return `
                <div class="tool-section">
                    <h3>Color Picker</h3>
                    <div class="tool-controls">
                        <input type="color" class="form-control" id="colorInput" value="#3380dd" onchange="updateColorValues()">
                        <div class="color-display" id="colorDisplay" style="background-color: #3380dd;"></div>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Color Values</h3>
                    <div class="color-values">
                        <div class="color-value">
                            <span>HEX:</span>
                            <span id="hexValue">#3380dd</span>
                            <button class="btn btn--sm" onclick="copyColorValue('hexValue')">Copy</button>
                        </div>
                        <div class="color-value">
                            <span>RGB:</span>
                            <span id="rgbValue">rgb(51, 128, 221)</span>
                            <button class="btn btn--sm" onclick="copyColorValue('rgbValue')">Copy</button>
                        </div>
                        <div class="color-value">
                            <span>HSL:</span>
                            <span id="hslValue">hsl(219, 71%, 53%)</span>
                            <button class="btn btn--sm" onclick="copyColorValue('hslValue')">Copy</button>
                        </div>
                    </div>
                </div>
            `;
            
        case 'qr-generator':
            return `
                <div class="tool-section">
                    <h3>QR Code Input</h3>
                    <textarea class="form-control textarea-small" id="qrInput" placeholder="Enter text or URL"></textarea>
                    <div class="tool-controls">
                        <select class="form-control" id="qrSize">
                            <option value="200">200x200</option>
                            <option value="300">300x300</option>
                            <option value="400">400x400</option>
                            <option value="500">500x500</option>
                        </select>
                        <button class="btn btn--primary" onclick="generateQR()">Generate QR Code</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>QR Code</h3>
                    <div class="qr-code-container" id="qrResult">
                        QR code will appear here
                    </div>
                </div>
            `;
            
        case 'markdown-converter':
            return `
                <div class="tool-section">
                    <h3>Markdown Input</h3>
                    <textarea class="form-control textarea-large" id="markdownConverterInput" placeholder="Enter Markdown text"></textarea>
                    <div class="tool-controls">
                        <button class="btn btn--primary" onclick="convertMarkdownToHTML()">Convert to HTML</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>HTML Output</h3>
                    <div class="tool-result" id="markdownConverterOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('markdownConverterOutput')">Copy</button>
                        <pre id="markdownConverterResult">HTML will appear here</pre>
                    </div>
                </div>
            `;
            
        case 'html-formatter':
            return `
                <div class="tool-section">
                    <h3>HTML Input</h3>
                    <textarea class="form-control textarea-large" id="htmlInput" placeholder="Enter HTML to format"></textarea>
                    <div class="tool-controls">
                        <select class="form-control" id="indentType">
                            <option value="2">2 Spaces</option>
                            <option value="4">4 Spaces</option>
                            <option value="tab">Tab</option>
                        </select>
                        <button class="btn btn--primary" onclick="formatHTML()">Format HTML</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h3>Formatted HTML</h3>
                    <div class="tool-result" id="htmlOutput">
                        <button class="btn btn--sm copy-btn" onclick="copyToClipboard('htmlOutput')">Copy</button>
                        <pre id="htmlResult">Formatted HTML will appear here</pre>
                    </div>
                </div>
            `;
            
        case 'image-converter':
            return `
                <div class="tool-section">
                    <h3>Image Upload</h3>
                    <div class="file-upload" onclick="document.getElementById('imageInput').click()">
                        <input type="file" id="imageInput" accept="image/*" onchange="handleImageUpload()">
                        <div>Click to select image</div>
                    </div>
                    <img id="imagePreview" class="image-preview" style="display: none;">
                </div>
                <div class="tool-section">
                    <h3>Conversion Options</h3>
                    <div class="tool-controls">
                        <select class="form-control" id="imageFormat">
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                        </select>
                        <div class="slider-container">
                            <label>Quality:</label>
                            <input type="range" class="slider" id="imageQuality" min="10" max="100" value="90">
                            <span id="imageQualityValue">90</span>
                        </div>
                        <button class="btn btn--primary" onclick="convertImage()" disabled id="convertBtn">Convert</button>
                    </div>
                </div>
            `;
            
        default:
            return '<p>Tool not implemented yet.</p>';
    }
}

function initializeTool(toolId) {
    switch(toolId) {
        case 'word-counter':
            updateWordCount();
            break;
        case 'char-counter':
            updateCharCount();
            break;
        case 'password-generator':
            updatePasswordLength();
            break;
        case 'markdown-editor':
            updateMarkdownPreview();
            break;
        case 'color-picker':
            updateColorValues();
            break;
        case 'image-converter':
            document.getElementById('imageQuality').addEventListener('input', function() {
                document.getElementById('imageQualityValue').textContent = this.value;
            });
            break;
    }
}

// Tool Functions

function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    if (!input) {
        document.getElementById('base64Result').textContent = 'Please enter text to encode.';
        return;
    }
    let result = '';
    try {
        result = btoa(unescape(encodeURIComponent(input)));
    } catch (e) {
        result = 'Invalid input';
    }
    document.getElementById('base64Result').textContent = result;
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    if (!input) {
        document.getElementById('base64Result').textContent = 'Please enter Base64 text to decode.';
        return;
    }
    let result = '';
    try {
        result = decodeURIComponent(escape(atob(input)));
    } catch (e) {
        result = 'Invalid Base64 input';
    }
    document.getElementById('base64Result').textContent = result;
}

function generateLorem() {
    const type = document.getElementById('loremType').value;
    const length = parseInt(document.getElementById('loremLength').value) || 5;
    if (!length || length < 1) {
        document.getElementById('loremResult').textContent = 'Please enter a valid length.';
        return;
    }
    const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
    let result = '';
    if (type === 'word') {
        for (let i = 0; i < length; i++) {
            result += loremWords[Math.floor(Math.random() * loremWords.length)];
            if (i < length - 1) result += ' ';
        }
    } else if (type === 'sentence') {
        for (let i = 0; i < length; i++) {
            const sentenceLength = Math.floor(Math.random() * 10) + 5;
            let sentence = '';
            for (let j = 0; j < sentenceLength; j++) {
                sentence += loremWords[Math.floor(Math.random() * loremWords.length)];
                if (j < sentenceLength - 1) sentence += ' ';
            }
            result += sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
            if (i < length - 1) result += ' ';
        }
    } else {
        for (let i = 0; i < length; i++) {
            const paragraphLength = Math.floor(Math.random() * 5) + 3;
            let paragraph = '';
            for (let j = 0; j < paragraphLength; j++) {
                const sentenceLength = Math.floor(Math.random() * 10) + 5;
                let sentence = '';
                for (let k = 0; k < sentenceLength; k++) {
                    sentence += loremWords[Math.floor(Math.random() * loremWords.length)];
                    if (k < sentenceLength - 1) sentence += ' ';
                }
                paragraph += sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
                if (j < paragraphLength - 1) paragraph += ' ';
            }
            result += paragraph;
            if (i < length - 1) result += '\n\n';
        }
    }
    document.getElementById('loremResult').textContent = result;
}

function generateSpecialChars(type) {
    const input = document.getElementById('specialInput').value;
    if (!input) {
        document.getElementById('specialResult').textContent = 'Please enter text to convert.';
        return;
    }
    let result = '';
    const charMaps = {
        bold: {
            'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳'
        },
        italic: {
            'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧'
        },
        circled: {
            'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ'
        },
        squares: {
            'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉'
        }
    };
    for (let char of input) {
        const lowerChar = char.toLowerCase();
        if (charMaps[type][lowerChar]) {
            result += charMaps[type][lowerChar];
        } else {
            result += char;
        }
    }
    document.getElementById('specialResult').textContent = result;
}

function generateUnicode() {
    const start = parseInt(document.getElementById('unicodeStart').value) || 32;
    const end = parseInt(document.getElementById('unicodeEnd').value) || 126;
    const length = parseInt(document.getElementById('unicodeLength').value) || 10;
    if (!length || length < 1) {
        document.getElementById('unicodeResult').textContent = 'Please enter a valid length.';
        return;
    }
    if (start > end) {
        document.getElementById('unicodeResult').textContent = 'Start value must be less than or equal to end value.';
        return;
    }
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomCode = Math.floor(Math.random() * (end - start + 1)) + start;
        result += String.fromCharCode(randomCode);
    }
    document.getElementById('unicodeResult').textContent = result;
}

function generateSnippet() {
    const language = document.getElementById('snippetLanguage').value;
    if (!language) {
        document.getElementById('snippetResult').textContent = 'Please select a language.';
        return;
    }
    const snippets = {
        JavaScript: `function helloWorld() {\n    console.log("Hello, World!");\n}\n\nhelloWorld();`,
        Python: `def hello_world():\n    print("Hello, World!")\n\nhello_world()`,
        Java: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
        'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
        Hindi: `नमस्ते दुनिया!\nयह हिंदी में एक नमूना पाठ है।`,
        Spanish: `¡Hola Mundo!\nEste es un texto de ejemplo en español.`,
        French: `Bonjour le monde!\nCeci est un exemple de texte en français.`
    };
    const snippet = snippets[language] || `Sample text in ${language}`;
    document.getElementById('snippetResult').textContent = snippet;
}

function generateFakeData() {
    const count = parseInt(document.getElementById('fakeDataCount').value) || 5;
    const fields = [];
    if (document.getElementById('firstName').checked) fields.push('firstName');
    if (document.getElementById('lastName').checked) fields.push('lastName');
    if (document.getElementById('email').checked) fields.push('email');
    if (document.getElementById('phone').checked) fields.push('phone');
    if (document.getElementById('address').checked) fields.push('address');
    if (document.getElementById('company').checked) fields.push('company');
    if (!fields.length) {
        document.getElementById('fakeDataResult').textContent = 'Please select at least one field.';
        return;
    }
    if (!count || count < 1) {
        document.getElementById('fakeDataResult').textContent = 'Please enter a valid count.';
        return;
    }
    const fakeData = [];
    const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];
    const companies = ['TechCorp', 'DataSys', 'WebDev Inc', 'CodeCraft', 'ByteWorks'];
    for (let i = 0; i < count; i++) {
        const person = {};
        if (fields.includes('firstName')) {
            person.firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        }
        if (fields.includes('lastName')) {
            person.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        }
        if (fields.includes('email')) {
            const first = person.firstName || 'user';
            const last = person.lastName || 'name';
            const domain = domains[Math.floor(Math.random() * domains.length)];
            person.email = `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`;
        }
        if (fields.includes('phone')) {
            person.phone = `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
        }
        if (fields.includes('address')) {
            person.address = `${Math.floor(Math.random() * 9999 + 1)} Main St, City, State 12345`;
        }
        if (fields.includes('company')) {
            person.company = companies[Math.floor(Math.random() * companies.length)];
        }
        fakeData.push(person);
    }
    document.getElementById('fakeDataResult').textContent = JSON.stringify(fakeData, null, 2);
}

function updateWordCount() {
    const text = document.getElementById('wordCountInput').value;
    if (!text) {
        document.getElementById('wordCount').textContent = 0;
        document.getElementById('charCount').textContent = 0;
        document.getElementById('charCountNoSpaces').textContent = 0;
        document.getElementById('paragraphCount').textContent = 0;
        document.getElementById('readingTime').textContent = 0;
        return;
    }
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words.length / 200);
    document.getElementById('wordCount').textContent = words.length;
    document.getElementById('charCount').textContent = characters;
    document.getElementById('charCountNoSpaces').textContent = charactersNoSpaces;
    document.getElementById('paragraphCount').textContent = paragraphs;
    document.getElementById('readingTime').textContent = readingTime;
}

function updateCharCount() {
    const text = document.getElementById('charCountInput').value;
    if (!text) {
        document.getElementById('totalChars').textContent = 0;
        document.getElementById('lettersCount').textContent = 0;
        document.getElementById('numbersCount').textContent = 0;
        document.getElementById('spacesCount').textContent = 0;
        document.getElementById('specialCharsCount').textContent = 0;
        return;
    }
    const totalChars = text.length;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const specialChars = totalChars - letters - numbers - spaces;
    document.getElementById('totalChars').textContent = totalChars;
    document.getElementById('lettersCount').textContent = letters;
    document.getElementById('numbersCount').textContent = numbers;
    document.getElementById('spacesCount').textContent = spaces;
    document.getElementById('specialCharsCount').textContent = specialChars;
}

async function generateHash() {
    const input = document.getElementById('hashInput').value;
    const algorithm = document.getElementById('hashAlgorithm').value;
    const format = document.getElementById('hashFormat').value;
    const uppercase = document.getElementById('hashUppercase').checked;
    
    // Simple hash functions (not cryptographically secure)
    let hash;
    if (algorithm === 'sha256') {
        hash = await simpleHash(input, 'SHA-256');
    } else if (algorithm === 'sha1') {
        hash = await simpleHash(input, 'SHA-1');
    } else {
        hash = simpleHash(input, 'MD5');
    }
    
    if (format === 'base64') {
        hash = btoa(hash);
    }
    
    if (uppercase) {
        hash = hash.toUpperCase();
    }
    
    document.getElementById('hashResult').textContent = hash;
}

async function simpleHash(str, algorithm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function updatePasswordLength() {
    const length = document.getElementById('passwordLength').value;
    document.getElementById('passwordLengthValue').textContent = length;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        document.getElementById('passwordResult').textContent = 'Please select at least one character type';
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('passwordResult').textContent = password;
    
    // Simple password strength indicator
    let strength = 'weak';
    if (length >= 8 && charset.length > 50) strength = 'medium';
    if (length >= 12 && charset.length > 70) strength = 'strong';
    
    const strengthEl = document.getElementById('passwordStrength');
    strengthEl.textContent = `Password strength: ${strength}`;
    strengthEl.className = `password-strength ${strength}`;
}

function convertCase(caseType) {
    const input = document.getElementById('textCaseInput').value;
    let result = '';
    
    switch (caseType) {
        case 'uppercase':
            result = input.toUpperCase();
            break;
        case 'lowercase':
            result = input.toLowerCase();
            break;
        case 'title':
            result = input.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            break;
        case 'sentence':
            result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
            break;
        case 'camel':
            result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
            break;
        case 'snake':
            result = input.toLowerCase().replace(/\s+/g, '_');
            break;
        case 'kebab':
            result = input.toLowerCase().replace(/\s+/g, '-');
            break;
    }
    
    document.getElementById('textCaseResult').textContent = result;
}

function compareDiff() {
    const original = document.getElementById('diffOriginal').value;
    const modified = document.getElementById('diffModified').value;
    
    const originalLines = original.split('\n');
    const modifiedLines = modified.split('\n');
    
    const diffResult = document.getElementById('diffResult');
    diffResult.innerHTML = '';
    
    const maxLines = Math.max(originalLines.length, modifiedLines.length);
    
    for (let i = 0; i < maxLines; i++) {
        const originalLine = originalLines[i] || '';
        const modifiedLine = modifiedLines[i] || '';
        
        const lineDiv = document.createElement('div');
        lineDiv.className = 'diff-line';
        
        if (originalLine === modifiedLine) {
            lineDiv.className += ' unchanged';
            lineDiv.textContent = originalLine;
        } else if (originalLine && !modifiedLine) {
            lineDiv.className += ' removed';
            lineDiv.textContent = `- ${originalLine}`;
        } else if (!originalLine && modifiedLine) {
            lineDiv.className += ' added';
            lineDiv.textContent = `+ ${modifiedLine}`;
        } else {
            lineDiv.className += ' removed';
            lineDiv.textContent = `- ${originalLine}`;
            diffResult.appendChild(lineDiv);
            
            const addedDiv = document.createElement('div');
            addedDiv.className = 'diff-line added';
            addedDiv.textContent = `+ ${modifiedLine}`;
            lineDiv = addedDiv;
        }
        
        diffResult.appendChild(lineDiv);
    }
}

function updateMarkdownPreview() {
    const markdown = document.getElementById('markdownInput').value;
    const preview = document.getElementById('markdownPreview');
    
    // Simple markdown to HTML conversion
    let html = markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*)\*/g, '<em>$1</em>')
        .replace(/`(.*)`/g, '<code>$1</code>')
        .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/\n/g, '<br>');
    
    preview.innerHTML = html;
}

function updateColorValues() {
    const colorInput = document.getElementById('colorInput');
    const hex = colorInput.value;
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    
    // Convert RGB to HSL
    const hsl = rgbToHsl(r, g, b);
    
    document.getElementById('colorDisplay').style.backgroundColor = hex;
    document.getElementById('hexValue').textContent = hex;
    document.getElementById('rgbValue').textContent = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('hslValue').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function copyColorValue(elementId) {
    const value = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(value);
}

function generateQR() {
    const text = document.getElementById('qrInput').value;
    const size = document.getElementById('qrSize').value;
    
    if (!text) {
        document.getElementById('qrResult').innerHTML = 'Please enter text or URL';
        return;
    }
    
    // Simple QR code generation using a public API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    
    document.getElementById('qrResult').innerHTML = `
        <img src="${qrUrl}" alt="QR Code">
        <br>
        <a href="${qrUrl}" target="_blank" class="btn btn--secondary" download="qrcode.png">Download QR Code</a>
    `;
}

function convertMarkdownToHTML() {
    const markdown = document.getElementById('markdownConverterInput').value;
    
    // Simple markdown to HTML conversion
    let html = markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*)\*/g, '<em>$1</em>')
        .replace(/`(.*)`/g, '<code>$1</code>')
        .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    html = '<p>' + html + '</p>';
    
    document.getElementById('markdownConverterResult').textContent = html;
}

function formatHTML() {
    const html = document.getElementById('htmlInput').value;
    const indentType = document.getElementById('indentType').value;
    
    let indent = '  ';
    if (indentType === '4') indent = '    ';
    if (indentType === 'tab') indent = '\t';
    
    // Simple HTML formatting
    let formatted = html
        .replace(/></g, '>\n<')
        .replace(/\n\s*\n/g, '\n');
    
    const lines = formatted.split('\n');
    let indentLevel = 0;
    const result = [];
    
    lines.forEach(line => {
        line = line.trim();
        if (line) {
            if (line.startsWith('</')) {
                indentLevel--;
            }
            result.push(indent.repeat(Math.max(0, indentLevel)) + line);
            if (line.startsWith('<') && !line.startsWith('</') && !line.endsWith('/>')) {
                indentLevel++;
            }
        }
    });
    
    document.getElementById('htmlResult').textContent = result.join('\n');
}

function handleImageUpload() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            document.getElementById('convertBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

function convertImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('imagePreview');
    const format = document.getElementById('imageFormat').value;
    const quality = document.getElementById('imageQuality').value / 100;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    ctx.drawImage(img, 0, 0);
    
    const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp';
    const dataUrl = canvas.toDataURL(mimeType, quality);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `converted-image.${format}`;
    link.href = dataUrl;
    link.click();
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    let text = '';
    if (element.tagName === 'PRE' || element.tagName === 'CODE') {
        text = element.innerText;
    } else if (element.querySelector('pre, code')) {
        text = element.querySelector('pre, code').innerText;
    } else if (element.querySelector('span')) {
        text = element.querySelector('span').innerText;
    } else {
        text = element.textContent || element.innerText;
    }
    navigator.clipboard.writeText(text).then(() => {
        const btn = element.querySelector('.copy-btn');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }
    });
}