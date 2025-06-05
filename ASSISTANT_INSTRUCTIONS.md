# Assistant Instructions - Git Protocol

## 🚨 CRITICAL RULE: Never Auto-Push to Git

**NEVER push changes to git without explicit user instruction.**

### What This Means:
- ✅ **DO**: Make code edits when requested
- ✅ **DO**: Commit changes locally when it makes sense
- ❌ **DON'T**: Automatically run `git push` commands
- ❌ **DON'T**: Push to remote repositories without being told

### Workflow:
1. **Make requested changes** to files
2. **Only commit locally** if user requests it OR if it's a logical checkpoint
3. **WAIT for explicit instruction** before pushing to remote
4. **Ask the user** if they want to push changes after completing work

### Acceptable Push Scenarios:
- User explicitly says "push to git" or "push to github"
- User says "deploy this" or "update production"
- User asks to "commit and push"
- User gives any other clear instruction to push

### Always Ask First:
- "Would you like me to commit and push these changes?"
- "Should I push this to GitHub now?"
- "Ready to deploy these updates?"

## Remember: Code changes ≠ Automatic deployment
The user controls when code goes live. 