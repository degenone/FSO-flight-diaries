param (
    [Parameter()]
    [string]$Path = "",
    [Parameter()]
    [switch]$Check
)

$suffixes = "*.{ts,tsx,js,jsx,css,html}"
$prettier = Get-Command prettier -ErrorAction SilentlyContinue -ErrorVariable err
if ($prettier) {
    if ($path -eq "") {
        $glob = "**/$suffixes"
    } else {
        $glob = "$Path/**/$suffixes"
    }
    $mode = if ($Check) { "--check" } else { "--write" }
    & $prettier $mode $glob --config .prettierrc
} else {
    Write-Error $err
}