import { FormatOptions } from '../components/FormatOptions';

export function removeDuplicatePrompts(input: string): string {
  const prompts = input.split(',').map(p => p.trim());
  const uniquePrompts = [...new Set(prompts)].filter(Boolean);
  return uniquePrompts.join(', ');
}

export function formatPrompts(input: string, options: FormatOptions): string {
  if (!input.trim()) return '';

  const convertBrackets = (text: string): string => {
    if (options.bracketStyle === 'preserve') return text;
    
    const brackets = {
      parentheses: ['(', ')'],
      square: ['[', ']'],
      curly: ['{', '}']
    }[options.bracketStyle];

    if (!brackets) return text;

    const stack: number[] = [];
    const chars = text.split('');
    
    for (let i = 0; i < chars.length; i++) {
      if ('([{'.includes(chars[i])) {
        stack.push(i);
      } else if (')]}'.includes(chars[i]) && stack.length > 0) {
        const openIndex = stack.pop()!;
        chars[openIndex] = brackets[0];
        chars[i] = brackets[1];
      }
    }

    return chars.join('');
  };

  const formatted = convertBrackets(input);

  return formatted
    .split(',')
    .map(prompt => {
      let part = prompt
        .trim()
        .replace(/_+/g, ' ')
        .replace(/\s+/g, ' ');

      if (options.spaceStyle === 'underscore') {
        part = part.replace(/\s/g, '_');
      }

      return part;
    })
    .filter(Boolean)
    .join(', ');
}