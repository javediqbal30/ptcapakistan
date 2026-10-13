$file = 'C:\ptcapakistan\src\pages\index.astro'
$content = [System.IO.File]::ReadAllText($file)

# 1. Change section class and wrap SectionHead in dark div
$oldSection = @'
  <section class="section corporate-hero">
    <div class="container">
      <SectionHead
        eyebrow="For organizations"
        title="Corporate sessions, workshops & webinars"
        lead="Professional training delivered to your team — on-site, online or customized. Perfect for companies, institutions and finance, HR and academic teams."
        align="center"
      />'@

$newSection = @'
  <section class="section corporate-training-section">
    <div class="corporate-hero-bg">
      <div class="container">
        <SectionHead
          eyebrow="For organizations"
          title="Corporate sessions, workshops & webinars"
          lead="Professional training delivered to your team — on-site, online or customized. Perfect for companies, institutions and finance, HR and academic teams."
          align="center"
        />'@

$content = $content.Replace($oldSection, $newSection)

# 2. Close dark div and start cards on light bg
$oldAfterHead = @'
      />
      <div class="grid grid--3" style="margin-top: var(--space-8);">'@

$newAfterHead = @'
      />
      </div>
    </div>
    <div class="container">
      <div class="grid grid--3" style="margin-top: var(--space-4);">'@

$content = $content.Replace($oldAfterHead, $newAfterHead)

[System.IO.File]::WriteAllText($file, $content)
Write-Host "HTML updated"