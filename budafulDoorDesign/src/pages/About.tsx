import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';

// Sample team data - replace with actual team members
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & Creative Director',
    image: '/images/placeholderImage.jpeg',
    description: 'With over 15 years of experience in crafting and design, Sarah brings her passion for creating beautiful door decorations to every piece.',
  },
  {
    name: 'Mike Thompson',
    role: 'Lead Designer',
    image: '/images/placeholderImage.jpeg',
    description: 'Mike specializes in seasonal designs and has a keen eye for color coordination and trending styles.',
  },
  {
    name: 'Emily Davis',
    role: 'Customer Relations Manager',
    image: '/images/placeholderImage.jpeg',
    description: 'Emily ensures that every customer receives personalized attention and the perfect design for their home.',
  },
];

export default function About(): JSX.Element {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              textAlign: 'center',
            }}
          >
            Our Story
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Creating beautiful, handcrafted door decorations since 2020
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/CounterPlaceholder.jpeg"
              alt="Our Mission"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              At Budaful Door Designs, we believe that every door tells a story. Our mission is to help you create a welcoming entrance that reflects your personal style and the spirit of each season.
            </Typography>
            <Typography variant="body1">
              We take pride in crafting high-quality, unique door decorations that bring joy and beauty to homes across the country. Each piece is handmade with attention to detail and a commitment to excellence.
            </Typography>
          </Grid>
        </Grid>

        {/* Values Section */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
            }}
          >
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Quality',
                description: 'We use only the finest materials to ensure our decorations last for years to come.',
              },
              {
                title: 'Creativity',
                description: 'Each design is unique and crafted to bring out the beauty of your home.',
              },
              {
                title: 'Customer Service',
                description: 'We are dedicated to providing exceptional service and support to every customer.',
              },
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: { xs: 6, md: 10 } }} />

        {/* Team Section */}
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
            }}
          >
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={member.image}
                    alt={member.name}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary.main" 
                      sx={{ mb: 2 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
