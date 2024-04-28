# give a script to count lines of code in a directory

import os
import sys

def loc(directory):
    total = 0
    try:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith('.js') or file.endswith('.vue') or file.endswith('.css'):
                    with open(os.path.join(root, file)) as f:
                        total += len(f.readlines())
        return total
    except Exception as e:
        print(e)
        return 'Directory not found'

if __name__ == '__main__':
    print(loc('src'))