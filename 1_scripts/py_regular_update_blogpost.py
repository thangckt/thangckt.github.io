import requests


def download_rawtext(url: str, outfile: str | None = None) -> str:
    """Download raw text from a URL."""
    response = requests.get(url)
    if response.status_code == 200:
        text = response.text
    else:
        print(f"Failed to download {url}. HTTP Status: {response.status_code}")
        text = None

    if text and outfile:
        with open(outfile, "w") as f:
            f.write(text)
        print(f"File downloaded: {outfile}")
    return text  # ty:ignore[invalid-return-type]


def create_mkdocsblog_text(
    text: str,
    title: str | None = None,
    date_post: str = "2024-09-25",
    label: list[str] = ["Science"],
) -> None:
    """Create a blog text."""
    ### extract title if not provided
    if title is None:
        title_strs = [s for s in text.split("\n") if s.startswith("# ")]
        if not title_strs:
            title_strs = [s for s in text.split("\n") if s.startswith("## ")]
        elif not title_strs:
            title_strs = [s for s in text.split("\n") if s.startswith("### ")]

        if title_strs:
            title = title_strs[0].replace("#", "").strip()
        else:
            title = "no_title"

    ### make post
    header = f"---\ntitle: {title}\ndate: {date_post}\nauthors: [thangckt]\ncategories: {label}\ncomments: true\n---\n"
    blog_text = f"{header}\n {text}"

    ### make filename
    title_words = (
        title.replace(":", "")
        .replace("?", "")
        .replace("!", "")
        .replace(".", "")
        .replace("-", " ")
        .split()
    )
    if len(title_words) > 5:
        title_words = title_words[:5]
    title_str = "_".join(title_words)
    filename = f"./_docs/blog/posts/{date_post}_{title_str}.md"

    ### write to file
    with open(filename, "w") as f:
        f.write(blog_text)
    return


def update_post(
    url: str,
    title: str | None = None,
    date_post: str = "2024-09-25",
    label: list[str] = ["Science"],
    source: str = "",
):
    text = download_rawtext(url)
    if source:
        credit_text = (
            f"Credit by: @[{source.replace('https://', '').replace('http://', '')}]({source})"
        )
        text = f"{text}\n\n{credit_text}"
    create_mkdocsblog_text(text, title, date_post, label)
    return


##### ANCHOR: udpate the blog posts
def main():
    update_post(
        url="https://raw.githubusercontent.com/JuDFTteam/best-of-atomistic-machine-learning/refs/heads/main/README.md",
        title="Best of Atomistic Machine Learning",
        date_post="2024-09-25",
        label=["Science", "ML", "Python"],
        source="https://github.com/JuDFTteam/best-of-atomistic-machine-learning",
    )

    update_post(
        url="https://raw.githubusercontent.com/ml-tooling/best-of-python-dev/refs/heads/main/README.md",
        title="Best of Python Developer Tools",
        date_post="2024-09-28",
        label=["Python"],
        source="https://github.com/ml-tooling/best-of-python-dev",
    )

    update_post(
        url="https://raw.githubusercontent.com/ml-tooling/best-of-python/refs/heads/main/README.md",
        title="Best of Python",
        date_post="2024-09-30",
        label=["Python"],
        source="https://github.com/ml-tooling/best-of-python",
    )

    update_post(
        url="https://raw.githubusercontent.com/vinta/awesome-python/refs/heads/master/README.md",
        title="Awesome Python",
        date_post="2024-09-20",
        label=["Python"],
        source="https://github.com/vinta/awesome-python",
    )

    update_post(
        url="https://raw.githubusercontent.com/Eipgen/Neural-Network-Models-for-Chemistry/refs/heads/main/README.md",
        title="Neural Network Models for Chemistry",
        date_post="2024-12-20",
        label=["Python", "ML"],
        source="https://github.com/Eipgen/Neural-Network-Models-for-Chemistry",
    )

    update_post(
        url="https://raw.githubusercontent.com/ml-tooling/best-of-ml-python/refs/heads/main/README.md",
        title="Best-of Machine Learning with Python",
        date_post="2025-01-20",
        label=["Python", "ML"],
        source="https://github.com/ml-tooling/best-of-ml-python",
    )

    update_post(
        url="https://raw.githubusercontent.com/blaiszik/awesome-matchem-datasets/refs/heads/main/README.md",
        title="Materials & Chemistry Datasets",
        date_post="2025-04-21",
        label=["Science", "ML"],
        source="https://github.com/blaiszik/awesome-matchem-datasets",
    )

    update_post(
        url="https://raw.githubusercontent.com/WanyuGroup/AI-for-Crystal-Materials/refs/heads/main/README.md",
        title="AI for Crystal Materials - models and benchmarks",
        date_post="2025-05-21",
        label=["Science", "ML"],
        source="https://github.com/WanyuGroup/AI-for-Crystal-Materials",
    )

    # update_post(
    #     url="https://raw.githubusercontent.com/heilcheng/awesome-agent-skills/refs/heads/main/README.md",
    #     title="Awesome Agent Skills",
    #     date_post="2026-03-05",
    #     label=["Agent", "AI", "LLM"],
    #     source="https://github.com/heilcheng/awesome-agent-skills",
    # )

    # update_post(
    #     url="https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/refs/heads/master/README.md",
    #     title="Awesome Claude Skills",
    #     date_post="2026-03-07",
    #     label=["Agent", "AI", "LLM"],
    #     source="https://github.com/ComposioHQ/awesome-claude-skills",
    # )

    return


if __name__ == "__main__":
    main()
