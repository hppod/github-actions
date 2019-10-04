import * as core from '@actions/core'
import * as github from '@actions/github'

const run = async (): Promise<void> => {
    try {
        //limit only to when issues are opened
        if (github.context.payload.action !== 'opened') return

        //check payload
        const issue = github.context.payload.issue
        if (!issue) return

        const token = process.env['GITHUB_TOKEN']
        if (!token) return

        //create octokit client
        const octokit: github.GitHub = new github.GitHub(token)
        const nwo = process.env['GITHUB_REPOSITORY'] || '/'
        const [owner, repo] = nwo.split('/')

        //reply with the thanks message
        const thanksMessage = core.getInput('thanks-message')
        const issueCommentResponse = await octokit.issues.createComment({
            owner,
            repo,
            issue_number: issue.number,
            body: thanksMessage
        })
        console.log(`Replied with thanks message: ${issueCommentResponse.data.url}`)

        //adding reaction
        const issueReactionResponse = await octokit.reactions.createForIssue({
            owner,
            repo,
            issue_number: issue.number,
            content: 'heart'
        })
        console.log(`Reacted: ${issueReactionResponse.data.content}`)
    } catch (error) {
        console.error(error.message)
        core.setFailed(`Thanks-action failure: ${error}`)
    }
}

run()

export default run